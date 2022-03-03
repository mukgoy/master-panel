import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    

    constructor(
        public http: ApiHttpService,
    ) { }

    getLeadCount() {
        let url = adminApi.report.leadcount;
        return this.http.get(url);
    }

    getUserCount() {
        let url = adminApi.report.usercount;
        return this.http.get(url);
    }

    getVisitorCount() {
        let url = adminApi.report.visitorcount;
        return this.http.get(url);
    }


}
