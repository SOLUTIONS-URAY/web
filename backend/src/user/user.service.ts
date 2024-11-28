import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getSpecialist() {
    return await this.usersRepository.find({
      where: {
        userRole: UserRole.ORG_MASTER,
      },
      select: {
        id: true,
        fullName: true,
        email: false,
        password: false,
        userRole: true,
      },
    });
  }
}
