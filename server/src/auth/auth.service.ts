import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    return user ? user : null;
  }

  async createUser(user: any): Promise<any> {
    return this.usersService.create(user);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }
}
