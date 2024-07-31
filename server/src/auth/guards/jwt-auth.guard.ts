import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('protected-route')
export class JwtAuthGuard {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return 'This is a protected route';
  }
}
