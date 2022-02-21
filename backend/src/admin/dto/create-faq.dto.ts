import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateFaqDto {
    
    @IsString()
    @ApiProperty()
    public question: string;

    @IsString()
    @ApiProperty()
    public answer: string;

    @ApiProperty()
    public botId: string;

    public req?: any

}
