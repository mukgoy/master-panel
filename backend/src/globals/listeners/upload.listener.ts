import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UploadEntity, ResourceUsageEntity, Resource } from '../entities';
import { ResourceUsageRepository } from '../repository/resource-usage.repository';
import { eventname } from './event-names';

@Injectable()
export class UploadListener {

	constructor(
		@InjectRepository(ResourceUsageRepository)
		private readonly usageRepository: ResourceUsageRepository
	) { }

	@OnEvent(eventname.upload.created)
	async handleUploadCreatedEvent(event: { user: UserEntity, upload: UploadEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.upload.deleted)
	async handleUploadDeletedEvent(event: { user: UserEntity, upload: UploadEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: UserEntity, upload: UploadEntity }, isCreated = true) {
		let usage = new ResourceUsageEntity({
			owner: new UserEntity({ userId: event.user.owner.userId }),
			resource: Resource.UPLOAD,
			usage: 1,
		});
		await usage.save().catch(async err => {
			if (err.writeErrors) {
				let data = await this.usageRepository.findOne({
					owner: event.user.owner,
					resource: Resource.UPLOAD,
				});
				data.usage = isCreated ? data.usage + 1 : data.usage - 1;
				data.save();
			}
		});
	}

}
