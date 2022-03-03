import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/services";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { MasterUserService } from "../services/master-user.service";

@ApiTags("Master user")
@ApiBearerAuth("access_token")
@Auth()
@Controller('admin/master-user')
export class MasterUserController {

  constructor(private readonly service: MasterUserService) {}

  @Post()
  create(@Request() req, @Body() createCustomerDto: CreateCustomerDto) {
    createCustomerDto.req = req
    return this.service.create(createCustomerDto);
  }

  @Get()
  findAll(@Request() req, @Body('botId') botId: string) {
    return this.service.findAll(req, botId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    updateCustomerDto.req = req
    return this.service.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: any) {
    return this.service.remove(req, id);
  }
}
