import { Entity, ObjectIdColumn, ObjectID, Column, UpdateDateColumn, BaseEntity, Unique } from "typeorm";
import { UserEntity } from "./user.entity";

export enum Resource {
	BOT = "bot",
	FAQ = "faq",
	USER = "user",
	UPLOAD = "upload",
	CUSTOMER = "customer",
}

@Entity({ name: 'resource_usage' })
@Unique("unique", ["owner", "resource"])
export class ResourceUsageEntity extends BaseEntity{
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	owner: UserEntity;

	@Column({ type: "enum", enum: Resource, default: Resource.CUSTOMER })
	resource: string;

	@Column({ default: 0 })
	usage: number;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date;

	constructor(data?: Partial<ResourceUsageEntity>) {
		super()
		Object.assign(this, data);
	}
}
