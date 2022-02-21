import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    
    @IsString()
    @ApiProperty()
    public username: string;

    @IsString()
    @ApiProperty()
    public password: string;

}
