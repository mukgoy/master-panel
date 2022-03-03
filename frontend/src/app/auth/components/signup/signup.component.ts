import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HelperService, UserService, ValidationService } from 'src/app/shared/services';
import { authNotify } from '../../enums';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ["",[Validators.required]],
    email: ["",[Validators.required, Validators.email]],
    password: ["",[Validators.required]],
    cpassword: ["",[Validators.required]],
    checkbox: ["",[Validators.required]]
  }, { 
    validators: [ValidationService.MustMatch('password', 'cpassword')]
  });
  formSubmited: boolean = false;
  queryParams: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public userService: UserService,
    private help: HelperService,
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.queryParams = params);
  }

  signup() {
    this.formSubmited = true;
    if (this.myForm.status == 'VALID') {
      this.authService.postUserSignup(this.myForm.value)
        .subscribe((response: any) => {
          console.log("signup");
          this.help.notify('success', authNotify.success.signup);
          setTimeout(()=>this.help.notify('success', authNotify.success.verifyEmail),2000)
          if (this.queryParams.returnUrl) {
            this.router.navigateByUrl(this.queryParams.returnUrl);
          } else {
            this.router.navigateByUrl("/admin");
          }
          
        }, (error: any) => {
          console.log("error", error);
          this.help.notify('error', error.error.message);
        });
    }
  };



}
