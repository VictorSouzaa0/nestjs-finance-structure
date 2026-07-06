import { IsOptional } from "class-validator";

export class listBillDto{

    @IsOptional()
    readonly id!: number

    @IsOptional()
    readonly bills_name?: string
    
    @IsOptional()
    readonly bills_balance?: number

    @IsOptional()
    readonly when_used?: Date

    @IsOptional()
    readonly accountId?: number
}