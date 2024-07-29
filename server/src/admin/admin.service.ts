import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../chat/schemas/chat.schema';
import { ApiKey } from '../settings/schemas/api-key.schema';
// import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>,
    private settingsService: SettingsService,
  ) {}

  async getUsers() {
    return this.chatModel.find().exec();
  }

  async removeUser(chatId: string) {
    return this.chatModel.deleteOne({ chatId }).exec();
  }

  async addApiKey(apiKey: string): Promise<void> {
    const newApiKey = new this.apiKeyModel({ key: apiKey, isActive: false });
    await newApiKey.save();
  }

  async setActiveApiKey(id: string): Promise<void> {
    await this.apiKeyModel.updateMany({}, { isActive: false }).exec(); // Deactivate all keys
    await this.apiKeyModel.findByIdAndUpdate(id, { isActive: true }).exec(); // Activate the selected key
  }

  async getAllApiKeys(): Promise<ApiKey[]> {
    return this.apiKeyModel.find().exec();
  }
}
