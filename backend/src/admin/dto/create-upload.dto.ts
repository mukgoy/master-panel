import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateUploadDto {
    
    @IsString()
    @ApiProperty()
    public originalname: string;

    @IsString()
    @ApiProperty()
    public filename: string;

    @IsString()
    @ApiProperty()
    public path: string;

    @IsInt()
    @ApiProperty()
    public size: number;

    public req?: any

}
