import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ObjectIdColumn, ObjectID} from 'typeorm';
import { CommonProperty } from './common.property';
import { MasterUserEntity } from './master-user.entity';

@Entity({name: 'uploads'})
export class UploadEntity extends CommonProperty{
    @ObjectIdColumn()
    uploadId: ObjectID;

    @Column({ nullable: true })
    originalname : string;

    @Column({ nullable: true })
    filename : string;

    @Column({ nullable: true })
    path : string;

    @Column({ nullable: true })
    size : number;

    @Column({ nullable: true })
    owner: MasterUserEntity;
}
