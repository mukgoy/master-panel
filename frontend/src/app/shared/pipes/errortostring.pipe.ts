import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errortostring',
  pure: false
})
export class ErrortostringPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const errorMsg : any = args[0];
    return this.errorToString(value, errorMsg.key, errorMsg.value);
  }

  errorToString(errorField:string, errorKey:string, errorValue:any) : String {
    let text = "";
    switch (errorKey) {
      case 'required': text = `${errorField} is required!`; break;
      case 'pattern': text = `${errorField} has wrong pattern!`; break;
      case 'email': text = `${errorField} has wrong email format!`; break;
      case 'minlength': text = `${errorField} has wrong length! Required min length: ${errorValue.requiredLength}`; break;
      case 'maxlength': text = `${errorField} has wrong length! Required max length: ${errorValue.requiredLength}`; break;
      case 'areEqual': text = `${errorField} must be equal!`; break;
      case 'invalidNumber': text = `${errorField} must be number!`; break;
      case 'mustMatch': text = `${errorField} must match!`; break;
      case 'mustHasNumber': text = `${errorField} must has number!`; break;
      case 'mustHasLowerChar': text = `${errorField} must has lowercase character!`; break;
      case 'mustHasUpperChar': text = `${errorField} must has uppercase character!`; break;
      case 'mustHasSpecialChar': text = `${errorField} must has special character!`; break;
      default: text = `${errorField}: ${errorKey} : ${errorValue}`;
    };
    return text;
  }
}
