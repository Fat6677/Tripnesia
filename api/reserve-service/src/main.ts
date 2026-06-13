import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Setup TCP Microservice untuk Reservation
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 9002, // Port TCP khusus Reservation Service
    },
  });

  // Mengaktifkan validasi otomatis
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(8002); // Port HTTP untuk postman
  console.log('Reservation Service Running at:\nPort: 8002 (HTTP)\n9002 (TCP)');
}
bootstrap();