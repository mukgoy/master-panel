import { BotEntity } from "./bot.entity";
import { ChatMessageEntity } from "./chat-message.entity";
import { CommonProperty } from "./common.property";
import { UserEntity } from "./user.entity";

export enum ChatUserType {
    BOT = "bot",
    AGENT = "agent",
    USER = "user",
}

export class ChatUserEntity extends CommonProperty{
    id?: string;
    primaryKey?: string;
    email?: string;
    phone?: string;
    name?: string;
    type: ChatUserType = ChatUserType.USER;
    bot?: BotEntity;
    owner?: UserEntity;
    agent?: UserEntity;
    lastMessage?: ChatMessageEntity
    chatMessages?: ChatMessageEntity[]
    constructor(user?: Partial<ChatUserEntity>) {
        super()
        Object.assign(this, user);
    }
}
