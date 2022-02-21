import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateChatUserDto {
    
    @IsEmail()
    @ApiProperty()
    public email: string;

    @IsOptional()
    @IsNumberString()
    @ApiProperty()
    public phone: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    public name: string;

}
