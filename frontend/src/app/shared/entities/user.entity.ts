import { BotEntity } from "./bot.entity";
import { ChatUserEntity } from "./chat-user.entity";
import { CommonProperty } from "./common.property";
import { FaqEntity } from "./faq.entity";
import { UploadEntity } from "./upload.entity";

export class UserEntity extends CommonProperty{
    userId?: string;
    team?: UserEntity[];
    owner?: UserEntity;
    primaryKey? : string;
    email? : string;
    phone? : string;
    name? : string;
    password? : string;
    isActive?: boolean = true;
    plans?: any[] = ['basic'];
    bots?: BotEntity[];
    faqs?: FaqEntity[];
    uploads?: UploadEntity[];
    chatUsers?: ChatUserEntity[];
    constructor(data?: Partial<UserEntity>) {
        super()
        Object.assign(this, data);
    }
}
