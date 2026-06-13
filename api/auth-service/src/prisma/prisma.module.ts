import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //Untuk membuat service bisa dipakai dimana saja
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
