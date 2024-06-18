import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BugsnagService } from '@schramautoparts/nest-bugsnag';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly bugsnag: BugsnagService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getError() {
    try {
      throw new Error('This is a test error');
    } catch (e) {
      this.bugsnag.instance.notify(e);
      return e;
    }
  }
}
