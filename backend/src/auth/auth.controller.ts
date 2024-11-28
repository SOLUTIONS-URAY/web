import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthLoginDto} from './dto/AuthLogin.dto';
import {AuthService} from './auth.service';
import {Response} from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

  @Post('/login')
  async login(
      @Body() body: AuthLoginDto,
      @Res({passthrough: true}) res: Response,
  ) {
    const userData = await this.authService.auth(body.email, body.password);
    res.cookie('access_token', userData.access_token, {
      httpOnly: true,
      secure: false,
    });
    return userData;
  }
}
