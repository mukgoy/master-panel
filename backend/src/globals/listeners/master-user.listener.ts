import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, ResourceUsageEntity, Resource } from '../entities';
import { ResourceUsageRepository } from '../repository/resource-usage.repository';
import { eventname } from './event-names';

@Injectable()
export class UserListener {

	constructor(
		@InjectRepository(ResourceUsageRepository)
		private readonly usageRepository: ResourceUsageRepository
	) { }

	@OnEvent(eventname.user.created)
	async handleUserCreatedEvent(event: { user: UserEntity, dtouser: UserEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.user.deleted)
	async handleUserDeletedEvent(event: { user: UserEntity, dtouser: UserEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: UserEntity, dtouser: UserEntity }, isCreated = true) {
		let usage = new ResourceUsageEntity({
			owner: new UserEntity({ userId: event.user.owner.userId }),
			resource: Resource.BOT,
			usage: 1,
		});
		await usage.save().catch(async err => {
			if (err.writeErrors) {
				let data = await this.usageRepository.findOne({
					owner: event.user.owner,
					resource: Resource.BOT,
				});
				data.usage = isCreated ? data.usage + 1 : data.usage - 1;
				data.save();
			}
		});
	}

}
