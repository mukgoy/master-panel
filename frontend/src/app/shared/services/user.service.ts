import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    ls = localStorage;
    constructor(private http: ApiHttpService) {
        const userJson = this.ls.getItem('currentUser');
        var user = userJson !== null ? JSON.parse(userJson) : null;
        this.currentUserSubject = new BehaviorSubject<any>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(user : any) {
        this.ls.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    logout() {
        this.ls.removeItem('currentUser');
        this.currentUserSubject.next(null);
        location.reload();
    }

}
