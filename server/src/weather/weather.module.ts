import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherService } from './weather.service';
import { ChatModule } from '../chat/chat.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, ChatModule],
  providers: [WeatherService],
})
export class WeatherModule {}
