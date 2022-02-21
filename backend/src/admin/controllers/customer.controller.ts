import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/services";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { CustomerService } from "../services/customer.service";

@ApiTags("Customer")
@ApiBearerAuth("access_token")
@Auth()
@Controller('admin/customer')
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Request() req, @Body() createCustomerDto: CreateCustomerDto) {
    createCustomerDto.req = req
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(@Request() req, @Body('botId') botId: string) {
    return this.customerService.findAll(req, botId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    updateCustomerDto.req = req
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: any) {
    return this.customerService.remove(req, id);
  }
}
