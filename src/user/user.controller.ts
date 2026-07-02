import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from 'generated/prisma/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() incomingData: CreateUserDto): Promise<UserModel>{
    return await this.userService.createUser(incomingData);
  }
}
