import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, ResourceUsageEntity, Resource, ChatUserEntity } from '../entities';
import { ResourceUsageRepository } from '../repository/resource-usage.repository';
import { eventname } from './event-names';

@Injectable()
export class CustomerListener {

	constructor(
		@InjectRepository(ResourceUsageRepository)
		private readonly usageRepository: ResourceUsageRepository
	) { }

	@OnEvent(eventname.customer.created)
	async handleCustomerCreatedEvent(event: { user: UserEntity, customer: ChatUserEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.customer.deleted)
	async handleCustomerDeletedEvent(event: { user: UserEntity, customer: ChatUserEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: UserEntity, customer: ChatUserEntity }, isCreated = true) {
		let usage = new ResourceUsageEntity({
			owner: new UserEntity({ userId: event.user.owner.userId }),
			resource: Resource.CUSTOMER,
			usage: 1,
		});
		await usage.save().catch(async err => {
			if (err.writeErrors) {
				let data = await this.usageRepository.findOne({
					owner: event.user.owner,
					resource: Resource.CUSTOMER,
				});
				data.usage = isCreated ? data.usage + 1 : data.usage - 1;
				data.save();
			}
		});
	}

}
