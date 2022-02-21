import { BotEntity, ChatUserEntity, FaqEntity, UploadEntity } from 'src/globals/entities';
import { Entity, Column, OneToMany, TreeChildren, TreeParent, ObjectIdColumn, ObjectID} from 'typeorm';
import { CommonProperty } from './common.property';

@Entity({name: 'master_users'})
export class MasterUserEntity extends CommonProperty{
    @ObjectIdColumn()
    userId: ObjectID;

    @TreeChildren()
    team: UserEntity[];

    @TreeParent()
    owner: UserEntity;

    @Column({unique: true})
    primaryKey : string;

    @Column()
    email : string;

    @Column()
    phone : string;

    @Column()
    name : string;

    @Column()
    password : string;

    @Column({ default: true })
    isActive: boolean = true;

		@Column({ default: ['basic'] })
		plans: any[] = ['basic'];

    profileName? : string;
    about? : string;

    bots: BotEntity[];
    faqs: BotEntity[];
    uploads: UploadEntity[];
    chatUsers: ChatUserEntity[];

    idToken?: string;
    authToken?: string;
    provider?: string;

    constructor(user?: Partial<UserEntity>) {
        super()
        Object.assign(this, user);
    }
}
