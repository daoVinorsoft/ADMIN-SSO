import { Injectable, RendererFactory2 } from '@angular/core';
import { AuthData, Login, Register, ForgotPass, ResetPass } from '../@core/data/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthServices extends AuthData {

  constructor(
    private http: HttpClient,
    private router: Router,
    // private toastyService: ToastyService,
    private rendererFactory: RendererFactory2
) {
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
    let url = this.BASE_URL + ``;
    return this.http.post(url, data).catch(this.errorHandler);
  }
  forgotPass(data: ForgotPass): Observable<any> {
    let url = this.BASE_URL + ``;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  resetPass(data: ResetPass): Observable<any> {
    let url = this.BASE_URL + ``;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  register(data: Register): Observable<any> {
    console.log(data);
    let url = this.BASE_URL + ``;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  logout(): Observable<any> {
    let url = this.BASE_URL + ``;
    return this.http.get(url).catch(this.errorHandler);
  }
}
