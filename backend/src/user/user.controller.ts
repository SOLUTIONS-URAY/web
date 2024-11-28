import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profi')
  async getSpecialist() {
    return await this.userService.getSpecialist();
  }
}
