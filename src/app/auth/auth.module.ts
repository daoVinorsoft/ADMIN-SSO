import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './authRouting.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgotPassModule } from './forgotPass/forgotPass.module';
import { ResetPassModule } from './resetPass/resetPass.module';
import { AuthComponent } from './auth.component'; // <---
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgOtpInputModule } from  'ng-otp-input';
import { AuthService } from '../@core/mock/auth.service';

@NgModule({
  imports: [
    NgOtpInputModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
    RegisterModule,
    ForgotPassModule,
    ResetPassModule,
    NzModalModule,
  ],
  declarations: [
    AuthComponent, // <---
  ],
  providers: [AuthService]
})
export class AuthModule {}
