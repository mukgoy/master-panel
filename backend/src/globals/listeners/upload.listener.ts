import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MasterUserEntity } from '../entities/master-user.entity';
import { UploadEntity } from '../entities/upload.entity';
import { eventname } from './event-names';

@Injectable()
export class UploadListener {

	constructor(
	) { }

	@OnEvent(eventname.upload.created)
	async handleUploadCreatedEvent(event: { user: MasterUserEntity, upload: UploadEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.upload.deleted)
	async handleUploadDeletedEvent(event: { user: MasterUserEntity, upload: UploadEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: MasterUserEntity, upload: UploadEntity }, isCreated = true) {
		console.log(event,isCreated)
	}

}
