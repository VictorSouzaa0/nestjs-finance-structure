import { Body, Controller, HttpCode, ParseIntPipe, Post, Get, Param, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountModel } from 'generated/prisma/models';
import { editAccountDto } from './dtos/edit-acount-dto';
import { Account } from 'generated/prisma/client';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}


  @Get(':id')
  @HttpCode(200)
  async getAccountByid(@Param('id', ParseIntPipe) id:number): Promise <AccountModel | null>{
    return await this.accountService.getAccountById({id: Number(id)})
  }

  @Put(':id')
  @HttpCode(200)
  async changeBalance(@Param('id', ParseIntPipe) id: number, @Body() updateAccount:editAccountDto): Promise<Account>{
    return await this.accountService.updateBalance(id,updateAccount)
  }
}
