import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { BotDefaultJsondata, BotDefaultOnboardjson } from "../../globals/entities/bot.entity";

export class CreateBotDto {
    
    @IsString()
    @ApiProperty()
    public name: string;

    @ApiProperty()
    public jsondata: BotDefaultJsondata;

    @ApiProperty()
    public onboardjson: BotDefaultOnboardjson;

    public req?: any

}
