import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { SettingsModule } from 'src/settings/settings.module';
// import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [SettingsModule],
  providers: [WeatherService],
})
export class WeatherModule {}
