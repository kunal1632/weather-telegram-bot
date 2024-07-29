import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiKey } from './schemas/api-key.schema';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>) {}

  async getActiveApiKey(): Promise<string> {
    const activeKey = await this.apiKeyModel.findOne({ isActive: true }).exec();
    return activeKey ? activeKey.key : null;
  }

  async getAllApiKeys(): Promise<ApiKey[]> {
    return this.apiKeyModel.find().exec();
  }

  async addApiKey(key: string): Promise<void> {
    const newApiKey = new this.apiKeyModel({ key, isActive: false });
    await newApiKey.save();
  }

  async setActiveApiKey(id: string): Promise<void> {
    await this.apiKeyModel.updateMany({}, { isActive: false }).exec(); // Deactivate all keys
    await this.apiKeyModel.findByIdAndUpdate(id, { isActive: true }).exec(); // Activate the selected key
  }
}
