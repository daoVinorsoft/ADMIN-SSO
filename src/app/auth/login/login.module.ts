import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgOtpInputModule } from  'ng-otp-input';
import { AuthService } from 'src/app/@core/mock/auth.service';


@NgModule({
  imports: [
    NgOtpInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    LoadingModule,
    NzModalModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})




export class LoginModule {}
