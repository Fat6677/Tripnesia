import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 🌟 Membuat PrismaService otomatis bisa diakses di semua modul
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Wajib di-export agar bisa dipakai service lain
})
export class PrismaModule {}