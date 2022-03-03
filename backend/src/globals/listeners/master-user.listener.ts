import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MasterUserEntity } from '../entities/master-user.entity';
import { eventname } from './event-names';

@Injectable()
export class MasterUserListener {

	constructor() { }

	@OnEvent(eventname.user.created)
	async handleUserCreatedEvent(event: { user: MasterUserEntity, dtouser: MasterUserEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.user.deleted)
	async handleUserDeletedEvent(event: { user: MasterUserEntity, dtouser: MasterUserEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: MasterUserEntity, dtouser: MasterUserEntity }, isCreated = true) {
		console.log(event,isCreated)
	}

}
