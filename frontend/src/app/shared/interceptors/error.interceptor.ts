import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		@Inject(PLATFORM_ID) public platformId: Object,
		public userService : UserService,
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError(err => {
			if ([401, 403].indexOf(err.status) !== -1) {
				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
				if(!request.url.includes('login')){
					this.userService.logout();
				}
			}

			const error = err.error.message || err.statusText;
			return throwError(error);
		}))
	}
}