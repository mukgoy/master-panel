import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/services';
import { BotDefaultJsondata, BotDefaultOnboardjson } from 'src/globals/entities';
import { CreateBotDto } from '../dto/create-bot.dto';
import { UpdateBotDto } from '../dto/update-bot.dto';
import { BotService } from '../services/bot.service';


@ApiTags("BOTs")
@ApiBearerAuth("access_token")
@Auth()
@Controller('admin/bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  create(@Request() req, @Body() createBotDto: CreateBotDto) {
    // console.log(createBotDto);
    createBotDto.req = req
    return this.botService.create(createBotDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.botService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let bot = await this.botService.findOne(id);
    bot.jsondata = bot.jsondata || new BotDefaultJsondata()
    bot.onboardjson = bot.onboardjson || new BotDefaultOnboardjson()
    return bot;
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateBotDto: UpdateBotDto) {
    updateBotDto.req = req
    return this.botService.update(id, updateBotDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.botService.remove(req, id);
  }
}
