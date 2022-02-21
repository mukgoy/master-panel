import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ForgotPasswordDto {
    
    @IsString()
    @ApiProperty()
    public email: string;

}
