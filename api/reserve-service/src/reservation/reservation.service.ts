import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Membuat Reservasi (Sudah Ada)
  async createReservation(data: CreateReservationDto) {
    const reservation = await this.prisma.reservation.create({
      data: {
        userId: data.userId,
        tourName: data.tourName,
        bookingDate: new Date(data.bookingDate),
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

  // 2. Mengambil Semua Riwayat Reservasi Berdasarkan User ID
  async getReservationsByUser(userId: string) {
    const history = await this.prisma.reservation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Menampilkan dari yang paling baru
    });
    return { data: history };
  }

  // 3. Mengambil Detail Satu Reservasi Berdasarkan ID Pesanan
  async getReservationDetail(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservasi dengan ID ${id} tidak ditemukan.`);
    }
    return { data: reservation };
  }

  // 4. Membatalkan Reservasi (Mengubah Status menjadi CANCELLED)
  async cancelReservation(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservasi dengan ID ${id} tidak ditemukan.`);
    }

    const updatedReservation = await this.prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return {
      message: 'Reservasi berhasil dibatalkan.',
      data: updatedReservation,
    };
  }
}