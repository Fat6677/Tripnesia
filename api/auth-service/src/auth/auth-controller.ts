import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Role } from '@prisma/client';
import {
  ForgotPassword,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyDto,
  VerifyResetOtpDto,
} from './dto/auth.dto';
import { JwtPayload } from './types/auth-payload.type'; // Sesuaikan path