import { IsOptional } from "class-validator";

export class listAccountDto{    

    @IsOptional()
    readonly balance!: number;

    @IsOptional()
    readonly userId!: number;
}