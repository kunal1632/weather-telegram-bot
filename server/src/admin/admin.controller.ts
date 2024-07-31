import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUsers() {
    return this.adminService.getUsers();
  }

  @Post('remove-user')
  async removeUser(@Body('chatId') chatId: string) {
    return this.adminService.removeUser(chatId);
  }

  @Post('add-api-key')
  async addApiKey(@Body('apiKey') apiKey: string) {
    return this.adminService.addApiKey(apiKey);
  }

  @Post('remove-api-key')
  async rempveApiKey(@Body('apiKeyId') apiKeyId: string) {
    return this.adminService.removeApiKey(apiKeyId);
  }

  @Post('set-active-api-key')
  async setActiveApiKey(@Body('apiKeyId') apiKeyId: string) {
    return this.adminService.setActiveApiKey(apiKeyId);
  }

  @Get('api-keys')
  async getApiKeys() {
    return this.adminService.getAllApiKeys();
  }
}
