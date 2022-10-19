import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthData } from 'src/app/@core/data/auth';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgotPass.component.html',
  styleUrls: ['./forgotPass.component.scss'],
})
export class ForgotPassComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthData,
    private message: NzMessageService,
    private router: Router
  ) {}
  validateForm!: FormGroup;
  showLoading = false;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.showLoading = true;
      // let email = this.validateForm.value.email;
      this.service.forgotPass(this.validateForm.value).subscribe(
        (res) => {
          this.showLoading = false;
          this.message.create('success', 'Đã gửi link về email của bạn');
        },
        (error) => {
          this.showLoading = false;
          this.message.create('error', 'Thông tin email không chính xác');
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
    });
  }
}
