import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation/reservation.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ReservationModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
