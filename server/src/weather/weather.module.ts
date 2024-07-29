import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
// import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
})
export class WeatherModule {}
