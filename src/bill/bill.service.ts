import { Injectable } from '@nestjs/common';
import { Bill } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBillDto } from './dtos/create-bill.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class BillService {
    constructor(private prisma: PrismaService){}

    async createBill(data: createBillDto): Promise <Bill>{
        return await this.prisma.bill.create({
            data: {
                bills_name: data.bills_name,
                bills_balance: data.bills_balance,
                when_used: data.when_used,
                accountId: data.accountId

            }
        })
    }

    async allBills(params:{
        skip?: number;
        take?:number;
        cursor?:Prisma.BillWhereUniqueInput;
        where?:Prisma.BillWhereUniqueInput;
        orderBy?:Prisma.BillOrderByWithRelationInput;
    }): Promise<any[]>{
        const{skip, take, cursor, where, orderBy} = params;
        return await this.prisma.bill.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            select : {
                id: true,
                bills_name: true,
                bills_balance: true,
                when_used: true,
                accountId: true
            }
        });
    }

    async deleteBill(where: Prisma.BillWhereUniqueInput): Promise <Bill>{
        return await this.prisma.bill.delete({where})
    }
}
