import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService, ValidationService } from 'src/app/shared/services';
import { authNotify } from '../../enums';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    password: ["",[Validators.required]],
    cpassword: ["",[Validators.required]]
  }, { 
    validators: [ValidationService.MustMatch('password', 'cpassword')]
  });
  formSubmited: boolean = false;
  token: string = ""
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private help: HelperService,
  ) {
    
  }

  ngOnInit(): void {
    console.log("params");
    this.activatedRoute.queryParams.subscribe((params:any) => {
      this.token = params.token;
    });
  }

  submit() {
    this.formSubmited = true;
    if (this.myForm.status == 'VALID') {
      this.authService.resetPassword(this.myForm.value, this.token)
        .subscribe((response: any) => {
          this.help.notify('success', authNotify.success.resetPassword);
          this.router.navigateByUrl("/admin");
        }, (error: any) => {
          console.log("error", error);
          this.help.notify('error', error.error.message);
        });
    }
  };

}
