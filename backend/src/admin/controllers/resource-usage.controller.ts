import { Controller, Get, Post, Body, Param, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/services';
import { CreateBotDto } from '../dto/create-bot.dto';
import { UpdateResourceUsageDto } from '../dto/update-resource-usage.dto';
import { ResourceUsageService } from '../services/resource-usage.service';


@ApiTags("Resource Usage")
@ApiBearerAuth("access_token")
@Auth()
@Controller('admin/resource-usage')
export class ResourceUsageController {
  constructor(private readonly usageService: ResourceUsageService) {}

  @Post()
  create(@Request() req, @Body() createBotDto: CreateBotDto) {
    // console.log(createBotDto);
    // createBotDto.req = req
    // return this.usageService.create(createBotDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.usageService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let usage = await this.usageService.findOne(id);
    return usage;
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updatedto: UpdateResourceUsageDto) {
    updatedto.req = req
    return this.usageService.update(id, updatedto);
  }
}
