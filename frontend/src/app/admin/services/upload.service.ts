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
export class UploadService {

	constructor(
		private http: ApiHttpService,
		private event: AdminEventService,
		private usageService: ResourceUsageService
	) { }

	post(file: File) {
		console.log(file);
		let isAllowed = this.usageService.checkUsage("upload");
		if (isAllowed) {
			const formData = new FormData();
			formData.append("file", file);
			return this.http.post(adminApi.upload, formData).pipe(
				tap((res: any) => {
					this.event.botCreated.next(res)
				})
			);
		}
		return throwError(new Error("Resource Limit"));
	};

	get() {
		const url = adminApi.upload;
		return this.http.get(url);
	};

}
