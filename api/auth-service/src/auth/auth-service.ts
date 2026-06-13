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
      throw new BadRequestException('Email sudah terdaftar di Tripnesia');
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

    // Sinkronisasi data user ke microservice lain jika diperlukan
    this.userServiceClient.emit('account_created', {
      accountId: verifiedUser.id,
      email: verifiedUser.email,
      name: verifiedUser.name,
      role: verifiedUser.role,
    });

    return { message: 'Verifikasi OTP berhasil, silakan login.' };
  }