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

  // Setup Global Validation Pipe yang lebih ketat
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Membuang properti yang tidak ada di DTO
      forbidNonWhitelisted: true, // Menolak request jika ada properti tak dikenal
      transform: true, // Otomatis mengubah string ke number/boolean jika DTO memintanya
    }),
  );

  // Setup CORS agar terhubung HANYA dengan frontend Tripnesia
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  app.enableCors({
    origin: frontendUrl ? frontendUrl.split(',') : '*', // Bisa dipisah koma jika ada lebih dari 1 frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Penting jika kelak menggunakan cookie untuk refresh token
  });

  await app.startAllMicroservices();
  await app.listen(httpPort);
  
  // Log yang dinamis dan ber-branding Tripnesia
  logger.log(`🚀 Tripnesia Auth Service is running!`);
  logger.log(`👉 HTTP Server : http://localhost:${httpPort}/api`);
  logger.log(`👉 TCP Microservice is listening on port ${tcpPort}`);
}
bootstrap();