import { Injectable } from '@nestjs/common';
import { Bill } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBillDto } from './dtos/create-bill.dto';

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
}
