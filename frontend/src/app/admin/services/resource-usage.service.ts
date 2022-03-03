import { Injectable } from '@angular/core';
import { availablePlans } from 'src/app/shared/enums';
import { ApiHttpService, UserService } from 'src/app/shared/services';
import { ConfirmationDialogService } from '../components/shared/confirmation-dialog/confirmation-dialog.service';
import { adminApi, adminNotify } from '../enums';
import { AdminStoreService } from './admin-store.service';

@Injectable({
	providedIn: 'root'
})
export class ResourceUsageService {

	currentUser: any;
	constructor(
		public http: ApiHttpService,
		public store: AdminStoreService,
		public userService: UserService,
		private confirmService: ConfirmationDialogService,
	) {
		this.currentUser = this.userService.currentUserValue;
	}

	getUsages() {
		const url = adminApi.resourceUsage.findAll;
		this.http.get(url).subscribe((res: any) => {
			this.store.usages.next(res)
		});
	}

	getUsageById(botId: string) {
		const url = adminApi.bot.findOne + '/' + botId;
		return this.http.get(url);
	}

	createUsage(obj: any) {
		const body = obj;
		const url = adminApi.resourceUsage.create;
		return this.http.post(url, body);
	}

	updateUsageById(obj: any) {
		const body = obj;
		const url = adminApi.resourceUsage.update + '/' + obj.botId;
		return this.http.put(url, body);
	}
	deleteUsageById(botId: string) {
		const url = adminApi.resourceUsage.remove + '/' + botId;
		return this.http.delete(url);
	}

	checkUsage(resource: string) {
		let finalLimit = 0;
		let nolimit = false;
		let currentPlans: string[] = this.currentUser.plans || ['basic', 'advance', 'pro']
		let isAllowed = false;
		currentPlans.forEach((plan: string) => {
			let limits = availablePlans[plan].limits;
			if (limits[resource]) {
				finalLimit += limits[resource]
			} else {
				isAllowed = true
			}
		})
		if (!isAllowed) {
			let usage = this.store.usages.value.filter(item => item.resource == resource)
			if (usage.length) {
				isAllowed = finalLimit > (usage[0].usage || 0)
			}
		}
		if (isAllowed) {
			return true;
		} else {
			this.confirmService.confirm(adminNotify.confirm.resourceLimit).subscribe((result: boolean) => {
				if (result) {
					console.log("redirect to pricing page");
					window.location.href = 'https://google.com';
				}
			})
			return false
		}
	}

}
