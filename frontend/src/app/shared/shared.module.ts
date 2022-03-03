import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import guards from './guards';
import interceptors from './interceptors';
import pipes, { ErrortostringPipe } from './pipes';
import services, { ScriptService } from './services';
import { HasPermissionDirective } from './directives/has-permission.directive';


@NgModule({
  declarations: [
    ErrortostringPipe,
		HasPermissionDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ...services
  ],
  exports: [
    ErrortostringPipe,
		HasPermissionDirective
  ]
})
export class SharedModule { }
