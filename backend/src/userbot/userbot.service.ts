import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessageEntity } from 'src/globals/entities';
import { eventname } from 'src/globals/listeners/event-names';
import { BotRepository } from 'src/globals/repository/bot.repository';
import { ChatMessageRepository } from 'src/globals/repository/chat-message.repository';
import { ChatUserRepository } from 'src/globals/repository/chat-user.repository';
import { FaqRepository } from 'src/globals/repository/faq.repository';
import { LessThan } from 'typeorm';
import { CreateChatUserDto } from './dto/create-chat-user.dto';
import { UpdateChatUserDto } from './dto/update-chat-user.dto';

@Injectable()
export class UserbotService {

  constructor(
		private eventEmitter: EventEmitter2,
    @InjectRepository(BotRepository) private readonly botRepository: BotRepository,
    @InjectRepository(FaqRepository) private readonly faqRepository: FaqRepository,
    @InjectRepository(ChatUserRepository) private readonly chatUserRepository: ChatUserRepository,
    @InjectRepository(ChatMessageRepository) private readonly chatMessageRepository: ChatMessageRepository


  ) { }

  getFaqs(botId: string) {
    return this.faqRepository.find({ where: { bot: { botId: botId } } });
  }

  getBot(botId: string) {
    return this.botRepository.findOne(botId);
  }

  async createChatUser(createChatUserDto: CreateChatUserDto) {
    return this.chatUserRepository.createUser(createChatUserDto)
		.then((chatUser)=>{
			let dto : any = createChatUserDto;
			this.eventEmitter.emit(eventname.customer.created, {user:dto, customer:chatUser});
			return chatUser
		})
		.catch(err => {
				if (err.writeErrors) {
						return this.chatUserRepository.findOne(createChatUserDto);
				}
		});
  }

  updateChatUser(updateChatUserDto: UpdateChatUserDto) {
    return this.chatUserRepository.updateUser(updateChatUserDto);
  }

  getPreviousMessagesHold(room: string, offset: string = "") {
    // let where:any = {room: room};
    // if(offset > 0){
    //   where.id = LessThan(offset)
    // }
    // return this.chatMessageRepository.find({
    //   where: where,
    //   order: { id: "DESC" },
    //   take: 10,
    // });
  }

  async getPreviousMessages(room: string, offset: string = "") {
    let msg = await this.chatMessageRepository.findOne(offset);
    let where: any = { room: room };
    if (offset) {
      where._id = {"$lt":msg.id}
      console.log(typeof msg.id)
    }
    return this.chatMessageRepository.find({
      select:['id','room','message','sender'],
      // select:['id','room','message'],
      where : where,
      order: { createdAt: -1 },
      take: 10,
    });
  }
}
