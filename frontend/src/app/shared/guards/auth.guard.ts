import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        public userService : UserService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.userService.currentUserValue;
        if (currentUser?.access_token) {

            if(this.isTokenExpired(currentUser.access_token)){//check token expired
                this.userService.logout();
                return false;
            }

            // check if route is restricted by role
            // if (route.data.accessKey && !userAccess[route.data.accessKey] && userAccess[route.data.accessKey] == "Not visible") {
            //     console.log(route.data.accessKey);
            //     console.log(userAccess);
            //     this.userService.makeLocalStorageEmpty();
            //     this.router.navigate(['/auth/login']);
            //     return false;
            // }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    private isTokenExpired(access_token: string) {
        const expiry = (JSON.parse(atob(access_token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}
