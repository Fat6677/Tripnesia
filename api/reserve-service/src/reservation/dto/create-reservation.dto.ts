import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  // Sementara userId dikirim via Postman untuk pengetesan. 
  // Nanti akan kita ubah agar otomatis diambil dari token.
  @IsNotEmpty()
  @IsString()
  userId: string; 

  @IsNotEmpty()
  @IsString()
  tourName: string;

  @IsNotEmpty()
  @IsDateString()
  bookingDate: string; // Format ISO 8601, cth: "2026-12-25T00:00:00Z"

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  guests: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  totalPrice: number;
}