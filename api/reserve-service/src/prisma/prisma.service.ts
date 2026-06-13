import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Di Prisma v6, ini otomatis membaca DATABASE_URL dari .env saat koneksi dimulai
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}