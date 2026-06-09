import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('test')
export class TestController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('users')
  async getUsers() {
    return await (this.prisma as any).user.findMany();
  }
}
