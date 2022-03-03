import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CustomerEntity } from '../entities/customer.entity';
import { MasterUserEntity } from '../entities/master-user.entity';
import { eventname } from './event-names';

@Injectable()
export class CustomerListener {

	constructor() { }

	@OnEvent(eventname.customer.created)
	async handleCustomerCreatedEvent(event: { user: MasterUserEntity, customer: CustomerEntity }) {
		this.resourceCreateOrDelete(event, true)
	}

	@OnEvent(eventname.customer.deleted)
	async handleCustomerDeletedEvent(event: { user: MasterUserEntity, customer: CustomerEntity }) {
		this.resourceCreateOrDelete(event, false)
	}

	async resourceCreateOrDelete(event: { user: MasterUserEntity, customer: CustomerEntity }, isCreated = true) {
		console.log(event,isCreated)
	}

}
