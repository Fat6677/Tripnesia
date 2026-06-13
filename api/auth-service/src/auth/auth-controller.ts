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
import { JwtPayload } from './types/auth-payload.type'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() data: VerifyDto) {
    return this.authService.verifyOtp(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() data: ForgotPassword) {
    return this.authService.forgotPassword(data);
  }

  @Post('verify-reset-otp')
  @HttpCode(HttpStatus.OK)
  async verifyResetOtp(@Body() data: VerifyResetOtpDto) {
    return this.authService.verifyResetOtp(data);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  // ==========================================================
  // MICROSERVICES EVENT LISTENERS (TCP / Message Broker)
  // ==========================================================

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() id: string) {
    return this.authService.findById(id);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateToken(@Payload() token: string): Promise<JwtPayload | null> {
    return this.authService.validateToken(token);
  }

  @MessagePattern({ cmd: 'role_updated' })
  async handleRoleUpdated(
    @Payload() data: { accountId: string; role: Role; regionId: string },
  ) {
    await this.authService.syncRoleUpdate(data.accountId, data.role, data.regionId);
  }

  @EventPattern('account_deleted')
  async handleAccountDeleted(@Payload() data: { accountId: string }) {
    await this.authService.deletedUser(data.accountId);
  }