import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthData } from 'src/app/@core/data/auth';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthData,
    private message: NzMessageService,
    private router: Router
  ) {}
  validateForm!: FormGroup;
  showLoading = false;
  passwordVisible = false;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.showLoading = true;
      this.service.register(this.validateForm.value).subscribe(
        (res) => {
          this.showLoading = false;
          this.message.create('success', 'Đăng kí thành công');

          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.log(error);
          this.showLoading = false;
          this.message.create('error', 'Thông tin đăng kí không hợp lệ');
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
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      roleRequest: [null, [Validators.required]],
    });
  }
}
