import { Injectable } from '@angular/core';
import { Group, GroupCreate, GroupData } from '../data/group';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable()
export class GroupService extends GroupData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server error');
  }

  fetchGroup(id: string): Observable<any> {
    let url = this.BASE_URL + `/group/${id}`;
    return this.http.get(url).catch(this.errorHandler);
  }

  fetchGroups(): Observable<any> {
    let url = this.BASE_URL + `/group`;
    return this.http.get(url).catch(this.errorHandler);
  }

  createGroup(data: GroupCreate): Observable<any> {
    let url = this.BASE_URL + `/group`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .post(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  editGroup(data: Group, id: string): Observable<any> {
    let url = this.BASE_URL + `/group/${id}`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .put(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  deleteGroup(id: string): Observable<any> {
    let url = this.BASE_URL + `/group/${id}`;
    return this.http.delete(url).catch(this.errorHandler);
  }
}
