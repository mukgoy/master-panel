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
export class FaqService {

	constructor(
		public http: ApiHttpService,
		private event: AdminEventService,
		private usageService: ResourceUsageService
	) { }

	getFaqs() {
		const url = adminApi.faq.findAll;
		return this.http.get(url);
	}

	getFaqById(faqId: number) {
		const url = adminApi.faq.findAll + '/' + faqId;
		return this.http.get(url);
	}

	createFaq(obj: any) {
		let isAllowed = this.usageService.checkUsage("faq");
		if (isAllowed) {
			const body = obj;
			const url = adminApi.faq.create;
			return this.http.post(url, body).pipe(
				tap((res: any) => {
					console.log(res)
					this.event.faqCreated.next(res)
				})
			);
		}
		return throwError(new Error("Resource Limit"));
	}

	updateFaqById(obj: any) {
		const body = obj;
		const url = adminApi.faq.update + '/' + obj.faqId;
		return this.http.put(url, body);
	}

	deleteFaqById(faqId: string) {
		const url = adminApi.faq.remove + '/' + faqId;
		return this.http.delete(url).pipe(
			tap((res: any) => {
				console.log(res)
				this.event.faqDeleted.next(faqId)
			})
		);
	}
}
