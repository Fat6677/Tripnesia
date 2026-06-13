import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap-TripnesiaAuth'); // Logger spesifik Tripnesia

  app.setGlobalPrefix('api');

  // Ambil konfigurasi port & host dari Environment Variable
  const httpPort = configService.get<number>('PORT') || 8001;
  const tcpPort = configService.get<number>('TCP_PORT') || 9001;
  const tcpHost = configService.get<string>('TCP_HOST') || '0.0.0.0';

  // Setup Microservice TCP
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: tcpPort,
    },
  });
