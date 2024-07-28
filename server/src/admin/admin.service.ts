import { Injectable } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class AdminService {
  constructor(private readonly chatService: ChatService) {}

  async getAllUser(): Promise<any> {
    return this.chatService.findAll();
  }

  async removeUser(chatId: string): Promise<any> {
    return this.chatService.deleteChatid(chatId);
  }

  async changeCity(chatId: string, city: string): Promise<any> {
    return this.chatService.saveCity(chatId, city);
  }
}
