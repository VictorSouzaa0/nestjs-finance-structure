import { Body, Controller, Delete, HttpCode, ParseIntPipe, Post, Param, Get, Query } from '@nestjs/common';
import { BillService } from './bill.service';
import { createBillDto } from './dtos/create-bill.dto';
import { BillModel } from 'generated/prisma/models';
import { listBillDto } from './dtos/list-bill.dto';
import { retry } from 'rxjs';
import { Bill } from 'generated/prisma/client';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @HttpCode(201)
  async createBill(@Body() incomingData: createBillDto): Promise <BillModel>{
    return await this.billService.createBill(incomingData)
  }

  @Get()
  @HttpCode(200)
  async getAllBills(@Query() query: listBillDto): Promise <Bill[]>{
    return await this.billService.allBills({
      where:{
        id: query.id,
        bills_name: query.bills_name,
        bills_balance: query.bills_balance,
        accountId: query.accountId
      }
    })
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteBill(@Param('id', ParseIntPipe) id:number):Promise<BillModel>{
    return await this.billService.deleteBill({id: Number(id)})
  }
}
