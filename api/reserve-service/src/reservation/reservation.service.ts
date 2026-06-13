import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(data: CreateReservationDto) {
    // Memasukkan data ke database PostgreSQL
    const reservation = await this.prisma.reservation.create({
      data: {
        userId: data.userId,
        tourName: data.tourName,
        bookingDate: new Date(data.bookingDate), // Konversi string jadi Date
        guests: data.guests,
        totalPrice: data.totalPrice,
        status: 'PENDING',
      },
    });

    return {
      message: 'Reservasi berhasil dibuat! Silakan lanjutkan ke pembayaran.',
      data: reservation,
    };
  }
}