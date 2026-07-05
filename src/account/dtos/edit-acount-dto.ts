import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";


export class editAccountDto{    

    @IsOptional()
    @ApiProperty()
    readonly balance!: number;
}