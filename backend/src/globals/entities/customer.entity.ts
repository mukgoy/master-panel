import { UploadEntity } from 'src/globals/entities';
import { Entity, Column, TreeChildren, TreeParent, ObjectIdColumn, ObjectID} from 'typeorm';
import { CommonProperty } from './common.property';

@Entity({name: 'users'})
export class CustomerEntity extends CommonProperty{
    @ObjectIdColumn()
    userId: ObjectID;

    @TreeChildren()
    team: CustomerEntity[];

    @TreeParent()
    owner: CustomerEntity;

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
		
    idToken?: string;
    authToken?: string;
    provider?: string;

    constructor(user?: Partial<CustomerEntity>) {
        super()
        Object.assign(this, user);
    }
}
