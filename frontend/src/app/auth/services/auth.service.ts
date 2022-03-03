import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { authApi } from '../enums';
import { UserService } from '../../shared/services/user.service';
import { ApiHttpService } from 'src/app/shared/services/api-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http : ApiHttpService,
    public userService : UserService,
  ) { }

  postUserLogin(form:any){
    // console.log(form);
    const url = authApi.auth.login;
    const body = {
      "username": form.username,
      "password": form.password
    };
    return this.http.post(url, body).pipe(
      tap((response:any)=>{
        console.log(response);
        const { access_token } = response;
        if (access_token && access_token.length) {
          this.userService.login(response);
          return true;
        } else {
          throw new Error('no token')
        }
      })
    );
  }

  postUserSignup(form:any){
    // console.log(form);
    const url = authApi.auth.signup;
    const body = {
      "name":form.name,
      "email": form.email,
      "password": form.password,
      "cpassword": form.cpassword,
    };
    return this.http.post(url, body).pipe(
      tap((response:any)=>{
        console.log(response);
      })
    );
  }
  
  postSocialLogin(form:any){
    const url = authApi.auth.socialLogin;
    const {email, name, idToken, authToken, provider} = form;
    const body = {email, name, idToken, authToken, provider};

    return this.http.post(url, body).pipe(
      tap((response:any)=>{
        console.log(response);
        const { access_token } = response;
        if (access_token && access_token.length) {
          this.userService.login(response);
          return true;
        } else {
          throw new Error('no token')
        }
      })
    );
  }

  forgotPassword(form:any){
    const url = authApi.auth.forgotPassword;
    return this.http.post(url, form)
  }

  resetPassword(form:any, token:string){
    console.log({Authorization: `Bearer ${token}`});
    const url = authApi.auth.resetPassword;
    return this.http.post(url, form, {headers:{Authorization: `Bearer ${token}`}})
  }
}
