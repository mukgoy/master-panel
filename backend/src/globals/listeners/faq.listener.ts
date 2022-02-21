import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, FaqEntity, ResourceUsageEntity, Resource } from '../entities';
import { ResourceUsageRepository } from '../repository/resource-usage.repository';
import { eventname } from './event-names';

@Injectable()
export class FaqListener {

	constructor(
		@InjectRepository(ResourceUsageRepository)
		private readonly usageRepository: ResourceUsageRepository
	) { }

	@OnEvent(eventname.faq.created)
	async handleFaqCreatedEvent(event: { user: UserEntity, faq: FaqEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.faq.deleted)
	async handleFaqDeletedEvent(event: { user: UserEntity, faq: FaqEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: UserEntity, faq: FaqEntity }, isCreated = true) {
		let usage = new ResourceUsageEntity({
			owner: new UserEntity({ userId: event.user.owner.userId }),
			resource: Resource.FAQ,
			usage: 1,
		});
		await usage.save().catch(async err => {
			if (err.writeErrors) {
				let data = await this.usageRepository.findOne({
					owner: event.user.owner,
					resource: Resource.FAQ,
				});
				data.usage = isCreated ? data.usage + 1 : data.usage - 1;
				data.save();
			}
		});
	}

}
