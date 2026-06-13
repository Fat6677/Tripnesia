import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Sesuaikan path
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ClientProxy } from '@nestjs/microservices';
import { Role } from '@prisma/client';
import {
  ForgotPassword,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyDto,
  VerifyResetOtpDto,
} from './dto/auth.dto';
import { JwtPayload } from './types/auth-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  /**
   * Helper: Generate 6-digit OTP
   */
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(data: RegisterDto) {
    const { email, password, name } = data;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already registered in Tripnesia');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP berlaku 15 Menit

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        otpCode: otp,
        otpExpiresAt: expiresAt,
        isVerified: false,
      },
    });

    // Kirim event ke Microservice Email/Notifikasi Tripnesia
    this.notificationClient.emit('send_otp_email', {
      email: user.email,
      otp: otp,
      name: user.name,
    });

    return {
      message: 'Registration successful. Please check your email for the OTP code.',
      email: user.email,
    };
  }

  async verifyOtp(data: VerifyDto) {
    const { email, otpCode } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('User not found');
    if (user.isVerified) throw new BadRequestException('User verified already');
    if (user.otpCode !== otpCode) throw new BadRequestException('Wrong OTP Code');
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new BadRequestException('OTP Code was expired. Please request a new one.');
    }

    const verifiedUser = await this.prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    // Sinkronisasi data user ke microservice lain jika diperlukan
    this.userServiceClient.emit('account_created', {
      accountId: verifiedUser.id,
      email: verifiedUser.email,
      name: verifiedUser.name,
      role: verifiedUser.role,
    });

    return { message: 'Verification successful. Please login.' };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Wrong Credential');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Account not verified yet. Please verify your OTP first.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      regionId: user.regionId,
    };

    // Generate Access & Refresh Token untuk Tripnesia
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload), // Menggunakan secret dari module auth
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d', // Refresh token berlaku 7 hari
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }

  async forgotPassword(data: ForgotPassword) {
    const { email } = data;
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Keamanan: Jangan beritahu apakah email terdaftar atau tidak (mencegah enumerasi email)
    if (!user) {
      return { message: 'Jika email terdaftar, kode OTP akan dikirimkan ke email tersebut.' };
    }

    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { email },
      data: { otpCode: otp, otpExpiresAt: expiresAt },
    });

    this.notificationClient.emit('send_reset_password_email', {
      email: user.email,
      otp: otp,
      name: user.name,
    });

    return { message: 'Jika email terdaftar, kode OTP akan dikirimkan ke email tersebut.' };
  }

  async verifyResetOtp(data: VerifyResetOtpDto) {
    const { email, otpCode } = data;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.otpCode !== otpCode) throw new BadRequestException('Kode OTP tidak valid');
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Kode OTP sudah kedaluwarsa');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const newExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { email },
      data: { otpCode: resetToken, otpExpiresAt: newExpiresAt },
    });

    return {
      message: 'OTP valid. Silakan lanjutkan untuk membuat password baru.',
      resetToken: resetToken,
    };
  }

  async resetPassword(data: ResetPasswordDto) {
    const { email, resetToken, newPassword } = data;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.otpCode !== resetToken) {
      throw new BadRequestException('Sesi reset password tidak valid atau sudah kedaluwarsa');
    }
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Sesi reset password sudah kedaluwarsa');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: {
        password: hashedNewPassword,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    return { message: 'Password berhasil diubah. Silakan login dengan password baru Anda.' };
  }