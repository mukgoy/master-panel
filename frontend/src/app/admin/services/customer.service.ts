import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';
import { AdminEventService } from './admin-event.service';
import { ResourceUsageService } from './resource-usage.service';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {


	constructor(
		public http: ApiHttpService,
		private event: AdminEventService,
		private usageService: ResourceUsageService
	) { }

	allCustomers = [];
	getCustomers(pageObject: any) {
		let url = adminApi.customer.findAll;
		return this.http.get(url, pageObject);
	}

	getCustomerById(customerId: string) {
		const url = adminApi.customer.findOne + '/' + customerId;
		return this.http.get(url);
	}

	createCustomer(obj: any) {
		let isAllowed = this.usageService.checkUsage("lead");
		if (isAllowed) {
			const body = obj;
			const url = adminApi.customer.create;
			return this.http.post(url, body).pipe(
				tap((res: any) => {
					this.event.botCreated.next(res)
				})
			);
		}
		return throwError(new Error("Resource Limit"));
	}

	updateCustomerById(obj: any) {
		console.log(obj)
		const body = obj;
		const url = adminApi.customer.update + '/' + obj.userId;
		return this.http.put(url, body);
	}

	deleteCustomerById(id: any) {
		const url = adminApi.customer.remove + '/' + id;
		return this.http.delete(url).pipe(
			tap((res: any) => {
				this.event.botDeleted.next(id)
			})
		);
	}


}
