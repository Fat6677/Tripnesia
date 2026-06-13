import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // opsional tapi enak biar gak import berkali-kali
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}