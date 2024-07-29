import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { WeatherService } from 'src/weather/weather.service';

import { ChatService } from 'src/chat/chat.service';
import * as cron from 'node-cron';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private bot_token = process.env.TELEGRAM_BOT_TOKEN;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly chatService: ChatService,
  ) {
    this.bot = new TelegramBot(this.bot_token, { polling: true });

    this.botCommands();

    cron.schedule('0 7 * * *', () => {
      console.log('sending daily Weather update ');

      this.sendWeatherToAll();
    });
  }

  private botCommands() {
    // Listen for the /start command
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      // Save chatId to the database for weather updates
      this.bot.sendMessage(
        chatId,
        'Welcome, Here your will get daily weather updates\n/help = To see all the avilable commands',
      );
    });
    // Listen for the /subscribe command
    this.bot.onText(/\/subscribe/, async (msg) => {
      const chatId = msg.chat.id;
      const firstName = msg.chat.first_name || '';
      const lastName = msg.chat.last_name || '';
      try {
        const isUserExist = await this.chatService.checkUser(chatId.toString());
        if (isUserExist) {
          this.bot.sendMessage(
            chatId,
            'You have already subscribe. To update your city use /setcity command',
          );
        } else {
          await this.chatService.saveChatId(
            chatId.toString(),
            firstName.toString(),
            lastName.toString(),
          );
          this.bot.sendMessage(
            chatId,
            'You have subscribed for daily weather updates. Default city is Delhi. To update the city use /setcity <city> to set your location.',
          );
        }
      } catch (error) {
        this.bot.sendMessage(chatId, 'Failed to subscribe for updates.');
      }
    });

    // Command to set city
    this.bot.onText(/\/setcity (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const city = match[1]; // Extract the city from the command
      try {
        const isUser = await this.chatService.checkUser(chatId.toString());
        if (isUser) {
          const res = await this.chatService.saveCity(
            chatId.toString(),
            city.toString(),
          );
          if (res) {
            this.bot.sendMessage(
              chatId,
              `Your city has been set to ${city}. You will receive weather updates for this city.`,
            );
          } else {
            this.bot.sendMessage(
              chatId,
              `Something went wrong please try again later`,
            );
          }
        } else {
          this.bot.sendMessage(
            chatId,
            `Your are not subscribed. use /subscribe then use /setcity to update your current city`,
          );
        }
      } catch (error) {
        this.bot.sendMessage(chatId, 'Failed to set city.');
      }
    });

    // Command to fetch weather for a city
    this.bot.onText(/\/weather/, async (msg) => {
      const chatId = msg.chat.id;
      try {
        const user = await this.chatService.findAll();
        const chat = user.find((c) => c.chatId === chatId.toString());
        if (chat && chat.city) {
          const weatherData = await this.weatherService.getWeatherForCity(
            chat.city,
          );
          const weatherMessage = `Weather in ${chat.city}: ${weatherData.description}\nTemperature: ${weatherData.temp}°C\nFeels Like: ${weatherData.feelsLike}°C\nHumidty: ${weatherData.humidity}%\nWind speed: ${weatherData.windSpeed}kph.`;
          this.bot.sendMessage(chatId, weatherMessage);
        } else {
          this.bot.sendMessage(
            chatId,
            'City not set. Use /setcity <cityName> to set your location.',
          );
        }
      } catch (error) {
        console.log(error.message);
        this.bot.sendMessage(chatId, 'Failed to fetch weather data.');
      }
    });

    // Listen for the /unsubscribe command
    this.bot.onText(/\/unsubscribe/, async (msg) => {
      const chatId = msg.chat.id;
      try {
        await this.chatService.deleteChatid(chatId.toString());
        this.bot.sendMessage(
          chatId,
          'You have been unsubscribe from weather updates',
        );
      } catch (error) {
        this.bot.sendMessage(chatId, 'Failed to unsubscribe');
      }
    });

    // listen for the /help command
    this.bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        'Here are the available commands:\n/subscribe - Subscribe for daily weather updates\n/setcity <cityName> - Set city to get its weather updates\n/weather - Get weather information for the selected city\n/help - Show this help message\n/unsubscribe - Stop reciving daily weather update\nDaily weather updates will be send very morning at 7:00 Am',
      );
    });
  }

  private async sendWeatherToAll() {
    try {
      const allUsers = await this.chatService.findAll();
      allUsers.forEach(async (user) => {
        const weather = await this.weatherService.getWeatherForCity(user.city);
        const message = `Good morning ${user.firstName}! Today the weather in ${user.city} is: ${weather.description}\nTemperature: ${weather.temp}°C\nFeels Like: ${weather.feelsLike}°C\nHumidty: ${weather.humidity}%\nWind speed: ${weather.windSpeed}kph.`;
        this.bot.sendMessage(user.chatId, message);
      });
    } catch (error) {
      console.log('Cannot send daily weather update');
    }
  }
}
