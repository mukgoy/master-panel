import { Injectable } from '@angular/core';
import { concat, Observable, Subject } from 'rxjs';
import { BotEntity, ChatUserEntity, FaqEntity, UploadEntity, UserEntity } from 'src/app/shared/entities';
import { ResourceUsageService } from './resource-usage.service';

@Injectable({
	providedIn: 'root'
})
export class AdminEventService {
	public botCreated: Subject<BotEntity> = new Subject()
	public botDeleted: Subject<string> = new Subject()
	public faqCreated: Subject<FaqEntity> = new Subject()
	public faqDeleted: Subject<string> = new Subject()
	public userCreated: Subject<UserEntity> = new Subject()
	public userDeleted: Subject<string> = new Subject()
	public uploadCreated: Subject<UploadEntity> = new Subject()
	public uploadDeleted: Subject<string> = new Subject()
	public customerCreated: Subject<ChatUserEntity> = new Subject()
	public customerDeleted: Subject<string> = new Subject()

	constructor(private usageService: ResourceUsageService,) {
		this.concat([
			this.botCreated,
			this.botDeleted,
			this.faqCreated,
			this.faqDeleted,
			this.userCreated,
			this.userDeleted,
			this.uploadCreated,
			this.uploadDeleted,
			this.customerCreated,
			this.customerDeleted
		]).subscribe(res => {
			console.log(res)
			setTimeout(() => { this.usageService.getUsages() }, 1000)
		})
	}

	concat(list: Subject<any>[]) {
		let sub: Subject<any> = new Subject()
		list.forEach(item => {
			item.subscribe(res => sub.next(res))
		})
		return sub
	}

}
