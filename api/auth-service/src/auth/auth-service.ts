import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
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
import { JwtPayload } from './types/auth-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(data: RegisterDto) {
    const { email, password, name } = data;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar di Tripnesia');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

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

    this.notificationClient.emit('send_otp_email', {
      email: user.email,
      otp: otp,
      name: user.name,
    });

    return {
      message: 'Registrasi berhasil. Silakan cek email untuk kode OTP.',
      email: user.email,
    };
  }

  async verifyOtp(data: VerifyDto) {
    const { email, otpCode } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('User tidak ditemukan');
    if (user.isVerified) throw new BadRequestException('User sudah terverifikasi');
    if (user.otpCode !== otpCode) throw new BadRequestException('Kode OTP salah');
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Kode OTP telah kedaluwarsa');
    }

    const verifiedUser = await this.prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    this.userServiceClient.emit('account_created', {
      accountId: verifiedUser.id,
      email: verifiedUser.email,
      name: verifiedUser.name,
      role: verifiedUser.role,
    });

    return { message: 'Verifikasi OTP berhasil, silakan login.' };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Kredensial salah');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Akun belum terverifikasi. Silakan verifikasi OTP terlebih dahulu.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      regionId: user.regionId || undefined, // <-- Perbaikan ada di sini: mengubah null menjadi undefined
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
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

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, role: true },
    });
  }

  async validateToken(token: string): Promise<JwtPayload | null> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  async syncRoleUpdate(accountId: string, newRole: Role, region?: string) {
    await this.prisma.user.update({
      where: { id: accountId },
      data: { role: newRole, regionId: region },
    });
  }

  async deletedUser(accountId: string) {
    await this.prisma.user.delete({ where: { id: accountId } });
  }
}