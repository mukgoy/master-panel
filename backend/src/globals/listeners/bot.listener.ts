import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, BotEntity, ResourceUsageEntity, Resource } from '../entities';
import { BotRepository } from '../repository/bot.repository';
import { ResourceUsageRepository } from '../repository/resource-usage.repository';
import { eventname } from './event-names';

@Injectable()
export class BotListener {

	constructor(
		@InjectRepository(BotRepository)
		private readonly botRepository: BotRepository,
		@InjectRepository(ResourceUsageRepository)
		private readonly usageRepository: ResourceUsageRepository,
		private eventEmitter: EventEmitter2
	) { }

	@OnEvent(eventname.bot.created)
	async handleBotCreatedEvent(event: { user: UserEntity, bot: BotEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.bot.deleted)
	async handleBotDeletedEvent(event: { user: UserEntity, bot: BotEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: UserEntity, bot: BotEntity }, isCreated = true) {
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
