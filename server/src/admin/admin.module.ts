import { Module } from '@nestjs/common';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ChatModule } from '../chat/chat.module';
import { SettingsModule } from '../settings/settings.module';
import { SettingsService } from '../settings/settings.service';

@Module({
  imports: [ChatModule, SettingsModule],
  providers: [AdminService, SettingsService],
  controllers: [AdminController],
})
export class AdminModule {}
