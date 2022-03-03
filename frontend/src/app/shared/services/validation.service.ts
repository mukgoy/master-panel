import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config : any = {
      required: 'Required',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control:FormControl) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  static emailValidator(control:FormControl) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static numeric(control: FormControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }
  
  static MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  static mustHasNumber(control: FormControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if(!(/\d/g.test(control.value))){
      return { 'mustHasNumber': true }
    }
    return null;
  }
  static mustHasLowerChar(control: FormControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if(!(/[a-z]/g.test(control.value))){
      return { 'mustHasLowerChar': true }
    }
    return null;
  }
  static mustHasUpperChar(control: FormControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if(!(/[A-Z]/g.test(control.value))){
      return { 'mustHasUpperChar': true }
    }
    return null;
  }
  static mustHasSpecialChar(control: FormControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if(!(/[!@#\$%\^\&*\)\(+=._-]+/g.test(control.value))){
      return { 'mustHasSpecialChar': true }
    }
    return null;
  }

  static getError(form: AbstractControl): any{
    if (form instanceof FormGroup) {
      let formErrors: any = {};
      Object.keys(form.controls).forEach(key => {
          let control = form.get(key);
          if(control){
            formErrors[key] = this.getError(control)
          }
      });
      return formErrors
    }
    if (form instanceof FormControl) {
      return {errors:form.errors};
    }
    if (form instanceof FormArray) {
      let arrayErr: any = [];
      form?.controls?.forEach(e => {
        arrayErr.push(this.getError(e));
      });
      return arrayErr
    }
  }
} 

