import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
    UsersModule,
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
