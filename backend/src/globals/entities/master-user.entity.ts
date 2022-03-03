import { UploadEntity } from 'src/globals/entities';
import { Entity, Column, TreeChildren, TreeParent, ObjectIdColumn, ObjectID} from 'typeorm';
import { CommonProperty } from './common.property';

export enum MasterRole {
	OWNER = 'owner',
	ADMIN = 'admin',
	MANAGER = 'manager',
	SUPPORT = 'support',
	DEV = 'dev',
	QA = 'qa',
}

@Entity({name: 'master_users'})
export class MasterUserEntity extends CommonProperty{
    @ObjectIdColumn()
    userId: ObjectID;

    @TreeChildren()
    team: MasterUserEntity[];

    @TreeParent()
    owner: MasterUserEntity;

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

		@Column({ default: MasterRole.SUPPORT })
		MasterRole: MasterRole = MasterRole.SUPPORT;

    uploads: UploadEntity[];

    idToken?: string;
    authToken?: string;
    provider?: string;

    constructor(user?: Partial<MasterUserEntity>) {
        super()
        Object.assign(this, user);
    }
}
