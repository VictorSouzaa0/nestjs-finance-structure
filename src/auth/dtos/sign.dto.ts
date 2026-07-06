import { ApiProperty } from "@nestjs/swagger";

export class signDto{
    @ApiProperty()
    readonly email!: string;

    @ApiProperty()
    readonly password!: string;

}