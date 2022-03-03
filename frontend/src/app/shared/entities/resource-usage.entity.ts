import { UserEntity } from "./user.entity";

export enum Resource {
	BOT = "bot",
	FAQ = "agent",
	LEAD = "lead",
}

export class ResourceUsageEntity{
    id?: string;
    owner?: UserEntity;
    resource? : string;
    usage? : number;
    updatedAt?: Date;
    constructor(data?: Partial<ResourceUsageEntity>) {
        Object.assign(this, data);
    }
}
