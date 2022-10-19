import { Injectable } from '@angular/core';
import { UserGroup, UserGroupCreate, UserGroupData } from '../data/userGroup';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable()
export class UserGroupService extends UserGroupData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server error');
  }

  fetchUserGroup(id: string): Observable<any> {
    let url = this.BASE_URL + `/user-group/${id}`;
    return this.http.get(url).catch(this.errorHandler);
  }

  fetchUserGroups(): Observable<any> {
    let url = this.BASE_URL + `/user-group`;
    return this.http.get(url).catch(this.errorHandler);
  }

  createUserGroup(data: UserGroupCreate): Observable<any> {
    let url = this.BASE_URL + `/user-group`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .post(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  editUserGroup(data: UserGroup, id: string): Observable<any> {
    let url = this.BASE_URL + `/user-group/${id}`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .put(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  deleteUserGroup(id: string): Observable<any> {
    let url = this.BASE_URL + `/user-group/${id}`;
    return this.http.delete(url).catch(this.errorHandler);
  }
}
