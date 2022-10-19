import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component'; // <---
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgotPass/forgotPass.component';
import { ResetPassComponent } from './resetPass/resetPass.component';
import { AuthComponent } from './auth.component';
export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot-pass',
        component: ForgotPassComponent,
      },
      {
        path: 'reset-pass/:token',
        component: ResetPassComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
