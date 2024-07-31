import { Injectable } from '@nestjs/common';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class WeatherService {
  constructor(private readonly settingService: SettingsService) {}

  async getWeatherForCity(city: string) {
    const apiKey =
      (await this.settingService.getActiveApiKey()) ||
      process.env.OPENWEATHERMAP_API_KEY;
    console.log('Api key used: ', apiKey);
    if (apiKey) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const res = await fetch(url);
      const response = await res.json();
      return {
        temp: response.main.temp,
        description: response.weather[0]?.description,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        feelsLike: response.main.feels_like,
      };
    } else {
      console.log('Api key not found');
    }
  }
}
