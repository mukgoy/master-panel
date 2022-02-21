import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateBotDto } from './create-bot.dto';

export class UpdateBotDto extends PartialType(CreateBotDto) {

    @ApiProperty()
    public botId: string;
}
