import { Body, Controller, Delete, HttpCode, ParseIntPipe, Post, Param } from '@nestjs/common';
import { BillService } from './bill.service';
import { createBillDto } from './dtos/create-bill.dto';
import { BillModel } from 'generated/prisma/models';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @HttpCode(201)
  async createBill(@Body() incomingData: createBillDto): Promise <BillModel>{
    return await this.billService.createBill(incomingData)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteBill(@Param('id', ParseIntPipe) id:number):Promise<BillModel>{
    return await this.billService.deleteBill({id: Number(id)})
  }
}
