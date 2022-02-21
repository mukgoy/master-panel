import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/services';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { FaqService } from '../services/faq.service';


@ApiTags("FAQs")
@ApiBearerAuth("access_token")
@Auth()
@Controller('admin/faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  create(@Request() req, @Body() createFaqDto: CreateFaqDto) {
    createFaqDto.req = req
    return this.faqService.create(createFaqDto);
  }

  @Get()
  findAll(@Request() req, @Body('botId') botId: string) {
    return this.faqService.findAll(req, botId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    updateFaqDto.req = req
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.faqService.remove(req, id);
  }
}
