import { Injectable } from '@angular/core';
import { AuthData, Login, Register, ForgotPass, ResetPass } from '../data/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthService extends AuthData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.status);
  }

  getToken(): String {
    var token = 'xx.yy.zz';
    if (localStorage.length != 0) {
      token = String(localStorage.getItem('userToken'));
    }
    return token;
  }

  login(data: Login): Observable<any> {
    let url = this.BASE_URL + `/authenticator/login/`;
    return this.http.post(url, data).catch(this.errorHandler);
  }
  forgotPass(data: ForgotPass): Observable<any> {
    let url = this.BASE_URL + `/account/api/v1/authentication/forgot_password`;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  // http://117.4.247.68:10706/vinorsoft/aicamera/v1.0/authenticator/password-reset/
  passwordResetValidate(data: { token: any; }): Observable<any> {
    let url = this.BASE_URL + `/authenticator/password-reset/validate_token/`;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  passwordReset(data: { email: any; }): Observable<any> {
    let url = this.BASE_URL + `/authenticator/password-reset/`;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  passwordResetConfirm(data: { password: any; token: any; }): Observable<any> {
    let url = this.BASE_URL + `/authenticator/password-reset/confirm/`;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  resetPass(data: ResetPass): Observable<any> {
    let url = this.BASE_URL + `/account/api/v1/authentication/reset_password`;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  register(data: Register): Observable<any> {
    console.log('Params register:', data);
    let url = this.BASE_URL + `/authenticator/register/`;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  logout(): Observable<any> {
    let url = this.BASE_URL + `/auth/api/v1/authentication/logout`;
    return this.http.get(url).catch(this.errorHandler);
  }
}
