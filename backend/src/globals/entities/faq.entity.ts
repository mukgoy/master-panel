import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId, ObjectIdColumn, ObjectID} from 'typeorm';
import { BotEntity } from './bot.entity';
import { CommonProperty } from './common.property';
import { UserEntity } from './user.entity';

@Entity({name: 'faqs'})
export class FaqEntity extends CommonProperty{
    @ObjectIdColumn()
    faqId: ObjectID;

    @Column({ nullable: true, type: "text" })
    question : string;

    @Column({ nullable: true, type: "text" })
    answer: string;

    @Column({ nullable: true })
    bot: BotEntity;

    @Column({ nullable: true })
    owner: UserEntity;
}
