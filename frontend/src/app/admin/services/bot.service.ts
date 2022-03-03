import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';
import { AdminEventService } from './admin-event.service';
import { ResourceUsageService } from './resource-usage.service';

@Injectable({
	providedIn: 'root'
})
export class BotService {

	constructor(
		public http: ApiHttpService,
		private event: AdminEventService,
		private usageService: ResourceUsageService
	) { }

	getBots() {
		const url = adminApi.bot.findAll;
		return this.http.get(url);
	}

	getBotById(botId: string) {
		const url = adminApi.bot.findOne + '/' + botId;
		return this.http.get(url);
	}

	createBot(obj: any) {
		let isAllowed = this.usageService.checkUsage("bot");
		if (isAllowed) {
			const body = obj;
			const url = adminApi.bot.create;
			return this.http.post(url, body).pipe(
				tap((res: any) => {
					this.event.botCreated.next(res)
				})
			);
		}
		return throwError(new Error("Resource Limit"));
	}

	updateBotById(obj: any) {
		const body = obj;
		const url = adminApi.bot.update + '/' + obj.botId;
		return this.http.put(url, body);
	}
	deleteBotById(botId: string) {
		const url = adminApi.bot.remove + '/' + botId;
		return this.http.delete(url).pipe(
			tap((res: any) => {
				this.event.botDeleted.next(botId)
			})
		);
	}
}
