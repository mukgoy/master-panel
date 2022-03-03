import { BotEntity } from "./bot.entity";
import { ChatUserEntity } from "./chat-user.entity";

export class ChatMessageEntity{
  id?: string;
  room?: string;
  message?: string;
  sender?: ChatUserEntity;
  bot?: BotEntity;
  createdAt?: Date = new Date();
  constructor(chat?: Partial<ChatMessageEntity>) {
    Object.assign(this, chat);
  }
}
