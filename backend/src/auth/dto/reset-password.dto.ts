import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ResetPasswordDto {
    
    @IsString()
    @ApiProperty()
    public password: string;

    @IsString()
    @ApiProperty()
    public cpassword: string;

    public req?: any

}
