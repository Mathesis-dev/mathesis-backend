import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserEntity from 'src/modules/user/domain/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { UserPayload } from '../domain/interfaces/user-payload.interface';
import { UserToken } from '../domain/interfaces/user-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: UserEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOneBy({ email }, false);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedException(
      'O Email e/ou senha estão incorretos ou são inválidos.',
    );
  }

  async validateAuth(requestUser?: {
    id: number;
    email: string;
  }): Promise<UserEntity> {
    if (!requestUser) throw new UnauthorizedException();

    return await this.userService.findOne(requestUser.id);
  }
}
