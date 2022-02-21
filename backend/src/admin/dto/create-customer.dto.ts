import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNumberString, IsString } from "class-validator";

export class CreateCustomerDto {
    
    @IsEmail()
    @ApiProperty()
    public email: string;

    @IsNumberString()
    @ApiProperty()
    public phone?: string;

    @IsString()
    @ApiProperty()
    public name?: string;

    public req?: any

}
