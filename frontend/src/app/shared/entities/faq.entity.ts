import { BotEntity } from './bot.entity';
import { CommonProperty } from './common.property';
import { UserEntity } from './user.entity';

export class FaqEntity extends CommonProperty{
    faqId?: string;
    question? : string;
    answer?: string;
    bot?: BotEntity;
    owner?: UserEntity;
    constructor(data?: Partial<FaqEntity>) {
        super()
        Object.assign(this, data);
    }
}
