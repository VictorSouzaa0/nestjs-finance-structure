import { Injectable } from '@nestjs/common';
import { Account, Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { editAccountDto } from './dtos/edit-acount-dto';


@Injectable()
export class AccountService {
    constructor(private prisma: PrismaService){}

    async getAccountById(
        accountWhereInput: Prisma.AccountWhereUniqueInput
    ): Promise <Account | null> {
        return await this.prisma.account.findUnique({where: accountWhereInput})
    }

    async updateBalance(
        id:number,
        data: editAccountDto
    ){
        return await this.prisma.account.update({
            where: {id: id},
            data: {
                balance: data.balance
            }
        })
    }
}

