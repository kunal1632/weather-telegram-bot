import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
// import { WeatherModule } from './weather/weather.module';
import { WeatherService } from './weather/weather.service';
import { ChatModule } from './chat/chat.module';
import { TelegramService } from './telegram/telegram.service';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HttpModule,
    ScheduleModule.forRoot(),
    ChatModule,
    SettingsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [TelegramService, WeatherService, AdminService],
})
export class AppModule {}
