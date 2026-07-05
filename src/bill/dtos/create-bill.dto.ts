import { ApiProperty } from "@nestjs/swagger";

export class createBillDto{

    @ApiProperty()
    readonly bills_name!: string

    @ApiProperty()
    readonly bills_balance!:number
    
    @ApiProperty()
    readonly when_used!: Date

    @ApiProperty()
    readonly accountId!: number
}