import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async getUser(chatId: string) {
    const exisitngChat = await this.chatModel.findOne({ chatId }).exec();
    if (exisitngChat) {
      return exisitngChat;
    } else {
      return null;
    }
  }

  async saveChatId(
    chatId: string,
    firstName: string,
    lastName: string,
  ): Promise<Chat> {
    const newChat = new this.chatModel({
      chatId,
      city: 'delhi',
      firstName,
      lastName,
    });
    return newChat.save();
  }

  async saveCity(chatId: string, city: string): Promise<boolean> {
    const user = await this.chatModel.findOne({ chatId }).exec();
    if (user) {
      user.city = city;
      user.save();
      return true;
    } else {
      return false;
    }
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async deleteChatid(chatId: string): Promise<any> {
    return this.chatModel.deleteOne({ chatId }).exec();
  }
}
