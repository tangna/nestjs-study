import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(nickName: string, pwd: string): Promise<any> {
    const user = await this.userService.findByNickName(nickName);
    // if (user?.password != pwd) {
    //   throw new UnauthorizedException();
    // }

    if (!user) {
      throw new UnauthorizedException();
    }
    const isValid = await bcrypt.compare(pwd, user.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, nickName: user.nickName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
