import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class BeforeloginGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.userService.currentUserValue;
        console.log(currentUser);
        if (currentUser?.access_token) {
            // redirect to home if already logged in
            if(route.queryParams['returnUrl']){
                this.router.navigateByUrl(route.queryParams['returnUrl']);
            }else{
                this.router.navigateByUrl("/admin");
            }
            
			
            // not authorised so return false
            return false;
        }
        return true;
    }
}