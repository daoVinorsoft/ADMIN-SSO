import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthData } from 'src/app/@core/data/auth';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './resetPass.component.html',
  styleUrls: ['./resetPass.component.scss'],
})
export class ResetPassComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthData,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  token = '';
  confirmed = true;
  validateForm!: FormGroup;
  setConfirmPassword(event: any) {
    if (this.validateForm.valid) {
      if (
        this.validateForm.value.password ===
        this.validateForm.value.confirmPassword
      ) {
        this.confirmed = true;
        console.log('confirmed');
      } else {
        this.confirmed = false;
      }
    } else {
      console.log('hihi');
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.confirmed === true) {
        let data = {
          token: this.token,
          password: this.validateForm.value.password,
        };

        this.service.resetPass(data).subscribe(
          (res) => {
            this.message.create('success', 'Tạo mật khẩu mới thành công');
            this.router.navigate(['/auth/login']);
          },
          (error) => {
            console.log(error);
            this.message.create('error', 'Tạo mật khẩu mới thất bại');
          }
        );
      } else {
      }
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
    const routeParams = this.route.snapshot.paramMap;
    this.token = String(routeParams.get('token'));

    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }
}
