import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import * as Sentry from '@sentry/node';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getError() {
    try {
      throw new Error('Something went wrong');
    } catch (e) {
      Sentry.captureException(e);
      return new HttpException(e.message, 500);
    }
  }
}
