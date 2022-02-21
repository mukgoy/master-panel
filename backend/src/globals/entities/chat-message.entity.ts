import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, RelationId, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';
import { BotEntity } from './bot.entity';
import { ChatUserEntity } from './chat-user.entity';

@Entity({name: 'chat_messages'})
export class ChatMessageEntity extends BaseEntity{

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  room: string;

  @Column()
  message: string;

  @Column()
  sender: ChatUserEntity;

  @Column({ nullable: true })
  bot: BotEntity;

  @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  constructor(chat?: Partial<ChatMessageEntity>) {
    super()
    Object.assign(this, chat);
  }
}
