import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserEntity } from 'src/globals/entities';
import { eventname } from 'src/globals/listeners/event-names';
import { ChatUserRepository } from 'src/globals/repository/chat-user.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { BotService } from './bot.service';

@Injectable()
export class CustomerService {

  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(ChatUserRepository) private readonly chatUserRepository: ChatUserRepository,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<ChatUserEntity> {
    let customer = await this.chatUserRepository.createUser(createCustomerDto);
		this.eventEmitter.emit(eventname.customer.created, {user:createCustomerDto.req.user, customer});
		return customer
  }

  findAllHOLD(req, botId = null) {
    if (botId) {
      return this.chatUserRepository.find({ where: { "bot.botId": botId } });
    } else {
      return this.chatUserRepository.find({ where: { "owner.userId": req.user.owner.userId } });
    }
  }

  async findAll(req, botId = null) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * (limit) || 0;
    const [result, total] = await this.chatUserRepository.findAndCount({
      where: { "owner.userId": req.user.owner.userId },
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
    return this.chatUserRepository.findOne(id, { relations: ["bot"] });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.chatUserRepository.updateUser(updateCustomerDto);
  }

  public async remove(req: any, id: string): Promise<any> {
    const customer: ChatUserEntity = await this.chatUserRepository.findOne(id);

    if (!customer) throw new NotFoundException(`customer with ID ${id} Not Found`);
    await this.chatUserRepository.delete(customer);
		this.eventEmitter.emit(eventname.customer.deleted, {user:req.user, customer});
    return { msg: `This action removes a #${id} customer` };
  }
}
