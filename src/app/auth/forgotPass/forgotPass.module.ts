import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ForgotPassComponent } from './forgotPass.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    SpinnerModule,
    LoadingModule,
  ],
  declarations: [ForgotPassComponent],
  // exports: [LoginComponent],
})
export class ForgotPassModule {}
