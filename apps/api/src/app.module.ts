import { Module } from '@nestjs/common';
import {
  BugsnagExceptionsFilter,
  BugsnagModule,
} from '@schramautoparts/nest-bugsnag';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BugsnagModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('BUGSNAG_API_KEY'),
        releaseStage: 'development',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BugsnagExceptionsFilter,
    },
  ],
})
export class AppModule {}
