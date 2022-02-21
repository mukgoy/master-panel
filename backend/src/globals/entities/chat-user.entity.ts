import { BotEntity, ChatMessageEntity, UserEntity } from 'src/globals/entities';
import { Entity, Column, ObjectIdColumn, ObjectID, Unique } from 'typeorm';
import { CommonProperty } from './common.property';

export enum ChatUserType {
    BOT = "bot",
    AGENT = "agent",
    USER = "user",
}

@Unique("index_name", ["primaryKey", "bot"])
@Entity({ name: 'chat_users' })
export class ChatUserEntity extends CommonProperty {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    primaryKey: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    @Column({ type: "enum", enum: ChatUserType, default: ChatUserType.USER })
    type: ChatUserType;

    @Column({ nullable: true })
    bot: BotEntity;

    @Column()
    owner: UserEntity;

    @Column({ nullable: true })
    agent: UserEntity;

    @Column({ nullable: true })
    lastMessage: any

    constructor(user?: Partial<ChatUserEntity>) {
        super()
        Object.assign(this, user);
    }
}
