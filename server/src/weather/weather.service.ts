import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherForCity(city: string) {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await this.httpService
      .get(url)
      .pipe(map((response) => response.data))
      .toPromise();
    return {
      temp: response.main.temp,
      description: response.weather[0]?.description,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      feelsLike: response.main.feels_like,
    };
  }
}
