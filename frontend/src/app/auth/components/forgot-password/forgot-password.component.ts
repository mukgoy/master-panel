import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/shared/services';
import { authNotify } from '../../enums';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
  });
  formSubmited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private help: HelperService,
  ) { }

  ngOnInit(): void {

  }

  submit() {
    this.formSubmited = true;
    if (this.myForm.status == 'VALID') {
      this.authService.forgotPassword(this.myForm.value)
        .subscribe((response: any) => {
          this.help.notify('success', authNotify.success.forgotPassword);
        }, (error: any) => {
          console.log("error", error);
          this.help.notify('error', error.error.message);
        });
    }
  };

}
