import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { FaqEntity } from '../../globals/entities/faq.entity';
import { FaqRepository } from 'src/globals/repository/faq.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eventname } from 'src/globals/listeners/event-names';

@Injectable()
export class FaqService {
  constructor(
		private eventEmitter: EventEmitter2,
    @InjectRepository(FaqRepository)
    private readonly faqRepository: FaqRepository,
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<FaqEntity> {
    let faq = await this.faqRepository.createFaq(createFaqDto);
		this.eventEmitter.emit(eventname.faq.created, {user:createFaqDto.req.user, faq});
		return faq
  }

  findAll(req, botId = null) {
    if (botId) {
      return this.faqRepository.find({ where: { 'bot.botId': botId } });
    } else {
      return this.faqRepository.find({
        where: { 'owner.userId': req.user.owner.userId },
      });
    }
  }

  findOne(id: string) {
    return this.faqRepository.findOne(id, { relations: ['bot'] });
  }

  update(id: string, updateFaqDto: UpdateFaqDto) {
    return this.faqRepository.updateFaq(updateFaqDto);
  }

  public async remove(req: any, id: string): Promise<any> {
    const faq: FaqEntity = await this.faqRepository.findOne(id);

    if (!faq) throw new NotFoundException(`Faq with ID ${id} Not Found`);
    await this.faqRepository.delete(faq);
		this.eventEmitter.emit(eventname.faq.deleted, {user:req.user, faq});
    return { msg: `This action removes a #${id} faq` };
  }
}
