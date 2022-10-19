import { Injectable } from '@angular/core';
import { User, UserCreate, UserEdit, UserData } from '../data/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends UserData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server error');
  }

  fetchUser(id: string): Observable<any> {
    let url = this.BASE_URL + `/user/${id}`;
    return this.http.get(url).catch(this.errorHandler);
  }
  getUserInfo(): Observable<any> {
    let url = this.BASE_URL + `/user/get-user-info/`;
    return this.http.get(url).catch(this.errorHandler);
  }

  fetchUsers(): Observable<any> {
    let url = this.BASE_URL + `/user`;
    return this.http.get(url).catch(this.errorHandler);
  }

  createUser(data: UserCreate): Observable<any> {
    let url = this.BASE_URL + `/user`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .post(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  editUser(data: UserEdit, id: string): Observable<any> {
    let url = this.BASE_URL + `/user/${id}`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .put(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  editUserInfo(data: any ): Observable<any> {
    let url = this.BASE_URL + `/user/post-change-user-info/`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .post(url, body, { headers: headers })
      .catch(this.errorHandler);
  }


  changePass(data: any): Observable<any> {
    let url = this.BASE_URL + `/authenticator/changePassword/`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .put(url, body, { headers: headers })
      .catch(this.errorHandler);
  }



  deleteUser(id: string): Observable<any> {
    let url = this.BASE_URL + `/user/${id}`;
    return this.http.delete(url).catch(this.errorHandler);
  }
}
