import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SocialDto {
    
    @IsString()
    @ApiProperty()
    public email: string;

    @IsString()
    @ApiProperty()
    public name: string;

    @IsString()
    @ApiProperty()
    public provider: string;

    public idToken?: string;
    public authToken?: string;

}
