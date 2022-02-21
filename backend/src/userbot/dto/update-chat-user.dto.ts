import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateChatUserDto } from './create-chat-user.dto';

export class UpdateChatUserDto extends PartialType(CreateChatUserDto) {
    @ApiProperty()
    public id: string;
}
