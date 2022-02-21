import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateResourceUsageDto } from './create-resource-usage.dto';

export class UpdateResourceUsageDto extends PartialType(CreateResourceUsageDto) {

    @ApiProperty()
    public id: string;
}
