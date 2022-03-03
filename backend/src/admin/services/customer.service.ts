import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/globals/entities';
import { eventname } from 'src/globals/listeners/event-names';
import { CustomerRepository } from 'src/globals/repository/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomerService {

  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(CustomerRepository) private readonly customerRepository: CustomerRepository,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    let customer = await this.customerRepository.createUser(createCustomerDto);
		this.eventEmitter.emit(eventname.customer.created, {user:createCustomerDto.req.user, customer});
		return customer
  }

  async findAll(req, botId = null) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * (limit) || 0;
    const [result, total] = await this.customerRepository.findAndCount({
      // where: { "owner.userId": req.user.owner.userId },
      order: { createdAt: 'DESC'},
      take: limit,
      skip: skip
    });
    return {
      data: result,
      count: total
    }
  }

  findOne(id: string) {
    return this.customerRepository.findOne(id, { relations: ["bot"] });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.updateUser(updateCustomerDto);
  }

  public async remove(req: any, id: string): Promise<any> {
    const customer: CustomerEntity = await this.customerRepository.findOne(id);

    if (!customer) throw new NotFoundException(`customer with ID ${id} Not Found`);
    await this.customerRepository.delete(customer);
		this.eventEmitter.emit(eventname.customer.deleted, {user:req.user, customer});
    return { msg: `This action removes a #${id} customer` };
  }
}
