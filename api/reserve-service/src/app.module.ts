import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [PrismaModule, ReservationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}