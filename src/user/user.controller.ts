import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from 'generated/prisma/models';
import { User } from 'generated/prisma/browser';
import { listUserDto } from './dtos/list-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers(@Query() query: listUserDto): Promise<User[]>{
    return this.userService.users({
      where : {
          id: query.id,
          email: query.email,
          name: query.name,
          lastname: query.lastname,
    
        }
    })
  };
  
  @Post('register')
  async create(@Body() incomingData: CreateUserDto): Promise<UserModel>{
    return await this.userService.createUser(incomingData);
  }


}
