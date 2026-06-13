import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // POST http://localhost:8002/api/reservations/book
  @Post('book')
  async createBook(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  // GET http://localhost:8002/api/reservations/user/:userId
  @Get('user/:userId')
  async getByUser(@Param('userId') userId: string) {
    return this.reservationService.getReservationsByUser(userId);
  }

  // GET http://localhost:8002/api/reservations/detail/:id
  @Get('detail/:id')
  async getDetail(@Param('id') id: string) {
    return this.reservationService.getReservationDetail(id);
  }

  // PATCH http://localhost:8002/api/reservations/cancel/:id
  @Patch('cancel/:id')
  async cancelBook(@Param('id') id: string) {
    return this.reservationService.cancelReservation(id);
  }
}