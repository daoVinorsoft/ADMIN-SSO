import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthData } from 'src/app/@core/data/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { AuthService } from 'src/app/@core/mock/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.timer(3);
  }
  countdown: any;
  passwordVisible = false;
  validateForm!: FormGroup;
  showLoading = false;
  isVisible = true;
  isVisibleRegister = false;
  isVisibleForgot = false;
  isVisibleChangePass = false;
  isShowFormOTP = false;
  formDataLogin!: FormGroup;
  formDataRegister!: FormGroup;
  formDataForgot!: FormGroup;
  formDataOTP!: FormGroup;
  otp: string | undefined;
  showOtpComponent = true;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent | undefined;
  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };

  ngOnInit(): void {
    this.formDataLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })

    this.formDataRegister = this.fb.group({
      fullName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
    })

    this.formDataOTP = this.fb.group({
      isForm: [null],
      OTP: [null],
    })
    this.formDataForgot = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
    })
    localStorage.removeItem('userToken');
  }

  timer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.countdown = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }

  onOtpChange(otp: string | undefined) {
    this.otp = otp;
    if (otp?.length == 6) {
      console.log('first OTP change:', otp)
      this.formDataOTP.patchValue({
        OTP: otp
      })
    }
  }

  handleModalOTP(value: any) {
    this.isShowFormOTP = true
    this.formDataOTP.patchValue({
      isForm: value
    })
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }
  submitFormRegister(): void {
    if (this.formDataRegister.valid) {
      console.log('submitFormRegister', this.formDataRegister.value)
      this.service.register(this.formDataRegister.value).subscribe(
        (res) => {
          this.message.create('success', 'Đăng ký tài khoản thành công');
          this.showLoading = false;
          this.isVisibleRegister = false
        },
        (error) => {
          this.showLoading = false;
          this.message.create('error', 'Đã xảy ra lỗi. Vui lòng xem kiểm tra lại thông tin.');
        }
      )
    }
  }


  submitFormOTP(): void {
    let _key = this.formDataOTP.value['isForm']
    let otp_forgot = '123456'
    switch (_key) {
      case "FORGOT":
        if (this.formDataOTP.value['OTP'] == otp_forgot) {
          console.log('first true', this.formDataOTP.value['OTP'])
          console.log('Key FORGOT.');

          let params = {
            token: this.formDataOTP.value['OTP']
          }
          this.service.passwordResetValidate(params).subscribe(
            (res) => {
              this.message.create('success', 'OTP chính xác.');
              this.isShowFormOTP = false
              this.isVisibleChangePass = true
            },
            (error) => {
              this.message.create('error', 'Đã xảy ra lỗi. Vui lòng xem kiểm tra lại thông tin.');
            }
          )
        }
        else {
          this.message.create('error', 'OTP không chính xác vui lòng kiểm tra lại.');
        }
        break;
      default:
        this.message.create('error', 'Đã xảy ra lỗi. Vui lòng xem kiểm tra lại thông tin.');
        console.log(`Sorry, we are out of ${_key}.`);
    }
  }

  submitFormForgot(value: any): void {

    if (value == 'INFOR') {
      console.log('%c submitFormForgot this.formDataForgot', 'color: #007acc;', this.formDataForgot.value);
      console.log('%c submitFormForgot this.formDataOTP.value', 'color: #007acc;', this.formDataOTP.value.value);
      let params = {
        email: this.formDataForgot.value['email'],
      }
      this.service.passwordReset(params).subscribe(
        (res) => {
          this.message.create('success', 'Email chính xác');
          this.isShowFormOTP = true
          this.handleModalOTP('FORGOT')
          this.isVisibleForgot = false
        },
        (error) => {
          this.message.create('error', 'Đã xảy ra lỗi. Vui lòng xem kiểm tra lại thông tin.');
        }
      )
    }
    if (value == 'CHANGEPASS') {
      if (this.formDataForgot.value['password'] == this.formDataForgot.value['rePassword']) {
        let params = {
          password: this.formDataForgot.value['password'],
          token: this.formDataOTP.value['OTP']
        }
        console.log('dkadkoádkaódaksodkaókdoakdkákd', params)
        this.service.passwordResetConfirm(params).subscribe(
          (res) => {
            this.message.create('success', 'Đã thay đổi mật khẩu thành công');
          },
          (error) => {
            this.message.create('error', 'Đã xảy ra lỗi. Vui lòng xem kiểm tra lại thông tin.');
          }
        )
        this.isShowFormOTP = false
        this.isVisibleChangePass = false
        this.isVisible = true;
        this.message.create('success', 'Thay đổi mật khẩu thành công.');
      } else {
        this.message.create('error', 'Mật khẩu không khớp.');
      }

    }
  }

  submitFormLogin(): void {
    console.log('this.formDataLogin.valid', this.formDataLogin.valid)
    if (this.formDataLogin.valid) {
      console.log('first this.formDataLogin.value', this.formDataLogin.value)
      this.showLoading = true;
      this.service.login(this.formDataLogin.value).subscribe(
        (res) => {
          this.showLoading = false;
          this.message.create('success', 'Đăng nhập thành công');
          localStorage.setItem('userToken', res.access);
          this.router.navigate(['/admin/user']);
        },
        (error) => {
          this.showLoading = false;
          this.message.create('error', 'Thông tin đăng nhập không chính xác');
        }
      );
    } else {
      // this.router.navigate(['/admin/user']);
      this.message.create('error', 'Vui lòng kiểm tra lại thông tin');
      // Object.values(this.validateForm.controls).forEach((control) => {
      //   if (control.invalid) {
      //     control.markAsDirty();
      //     control.updateValueAndValidity({ onlySelf: true });
      //   }
      // });
    }
  }

  showModal(): void {
    this.isVisible = true;
    this.isVisibleForgot = false
  }

  showModalRegister(): void {
    this.isVisible = false;
    this.isVisibleRegister = true
  }

  showModalForgot(): void {
    this.isVisible = false;
    this.isVisibleRegister = false
    this.isVisibleForgot = true
  }

  goBack(_key: any): void {
    switch (_key) {
      case 'REGISTER_F':
        this.isVisible = true;
        this.isVisibleRegister = false
        console.log('Oranges are $0.59 a pound.', _key);
        break;

      case 'OTP_F':
        this.isVisibleRegister = true
        this.isShowFormOTP = false
        console.log('Oranges are $0.59 a pound.', _key);
        break;

      case 'FORGET_F':
        this.isVisible = true;
        this.isVisibleForgot = false
        console.log('Oranges are $0.59 a pound.', _key);
        break;
      default:
        console.log(`Sorry, we are out of ${_key}.`);
    }
    // console.log('key goback:', _key)
    // this.isVisible = true;
    // this.isVisibleRegister = false
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
