import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { WeatherModule } from './weather/weather.module';

import { TelegramBotService } from './telegram/telegram-bot-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HttpModule,
    ScheduleModule.forRoot(),
    AdminModule,
    WeatherModule,
  ],
  providers: [TelegramBotService],
})
export class AppModule {}
