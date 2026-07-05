import { IsOptional } from "class-validator";


export class listUserDto{
    @IsOptional()
    readonly id?: number;
    @IsOptional()
    readonly email?: string;
    @IsOptional()
    readonly name?: string;
    @IsOptional()
    readonly lastname?: string;
    
}