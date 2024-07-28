import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.stratergy';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  providers: [AdminService, GoogleStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
