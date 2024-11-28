import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../models/User';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      private jwtService: JwtService,
  ) {
  }

  async auth(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        userRole: true,
        fullName: true,
      },
    });

    if (!user)
      throw new UnauthorizedException({message: 'Неверные почта или пароль'});
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (!passwordEquals)
      throw new UnauthorizedException({message: 'Неверные почта или пароль'});

    const user_data = {
      email: user.email,
      id: user.id,
      userRole: user.userRole,
      fullName: user.fullName,
    };

    return {
      access_token: await this.jwtService.signAsync(user_data),
      user_data,
    };
  }
}
