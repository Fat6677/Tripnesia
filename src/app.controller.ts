import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return {
      status: 'ok',
      service: 'tripnesia-api-gateway',
      timestamp: new Date().toISOString(),
    };
  }
}