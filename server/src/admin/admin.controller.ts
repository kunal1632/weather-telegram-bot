// src/admin/admin.controller.ts

import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';

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
  async addApiKey(@Body() updateSettingsDto: UpdateSettingsDto) {
    return this.adminService.addApiKey(updateSettingsDto.apiKey);
  }

  @Post('set-active-api-key/:id')
  async setActiveApiKey(@Param('id') id: string) {
    return this.adminService.setActiveApiKey(id);
  }

  @Get('api-keys')
  async getApiKeys() {
    return this.adminService.getAllApiKeys();
  }
}
