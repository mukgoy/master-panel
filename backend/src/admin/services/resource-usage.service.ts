import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResourceUsageRepository } from 'src/globals/repository/resource-usage.repository';
import { UpdateResourceUsageDto } from '../dto/update-resource-usage.dto';

@Injectable()
export class ResourceUsageService {

  constructor(
    @InjectRepository(ResourceUsageRepository)
    private readonly usagRepository: ResourceUsageRepository,
		private eventEmitter: EventEmitter2
  ) {}

  // async create(createBotDto: CreateBotDto):Promise<BotEntity> {
  //   let bot = await this.botRepository.createBot(createBotDto);
	// 	this.eventEmitter.emit(eventname.bot.created, {user:createBotDto.req.user, bot});
	// 	return bot
  // }

  findAll(req) {
    return this.usagRepository.find({
      where: {
        "owner.userId": req.user.owner.userId
      }
    });
  }

  findOne(id: string) {
    return this.usagRepository.findOne(id);
  }

  update(id: string, updateDto: UpdateResourceUsageDto) {
		const {usage} = updateDto
    return this.usagRepository.updateUsage({id, usage});
  }
}
