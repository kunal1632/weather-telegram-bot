import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ChatService } from '../chat/chat.service';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { TelegramBotService } from '../telegram/telegram-bot-service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly chatService: ChatService,
    private readonly httpService: HttpService,
    private readonly telegramBotService: TelegramBotService,
  ) {}

  @Cron('0 7 * * *') // Runs every day at 7 AM
  async handleCron() {
    const users = await this.chatService.findAll();

    users.forEach(async (user) => {
      const weather = await this.getWeatherForCity(user.city);
      const message = `Good morning ${user.firstName}! Today the weather in ${user.city} is ${weather.temp}°C with ${weather.description}.`;
      this.telegramBotService.sendMessage(user.chatId, message);
    });
  }

  async getWeatherForCity(city: string) {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await this.httpService
      .get(url)
      .pipe(map((response) => response.data))
      .toPromise();
    return {
      temp: (response.main.temp - 273.15)?.toFixed(2),
      description: response.weather[0]?.description,
    };
  }
}
