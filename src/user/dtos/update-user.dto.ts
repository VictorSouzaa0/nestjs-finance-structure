import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail } from "class-validator";
export class updateUserDto{

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    readonly email!: string;
    @ApiPropertyOptional()
    @IsString()
    readonly name!: string;
    @ApiPropertyOptional()
    @IsString()
    readonly lastname!: string;
    @ApiPropertyOptional()
    readonly password!: string;
    
}
