import { Body, Controller, Get, HttpCode, Post,Put, Query, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from 'generated/prisma/models';
import { User } from 'generated/prisma/browser';
import { listUserDto } from './dtos/list-user.dto';
import { updateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
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

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') id: number): Promise<UserModel | null>{
    return this.userService.user({id: Number(id)});
  } 

  @Post('register')
  @HttpCode(201)
  async create(@Body() incomingData: CreateUserDto): Promise<UserModel>{
    return await this.userService.createUser(incomingData);
  }

  @Put(':id')
  @HttpCode(200)
  async updateUser(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto: updateUserDto): Promise<User>{
    return this.userService.updateUser(id,updateUserDto)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseIntPipe) id:number): Promise<UserModel>{
    return this.userService.deleteUser({id: Number(id)})
  }
}
