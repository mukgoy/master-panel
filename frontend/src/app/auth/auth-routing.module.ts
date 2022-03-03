import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeforeloginGuard } from '../shared/guards/beforelogin.guard';
import { LogoutGuard } from '../shared/guards/logout.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {
    path: 'logout',
    component: LayoutComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [BeforeloginGuard],
    children : [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
