import { Injectable } from '@angular/core';
import { User, UserCreate, UserEdit, UserData } from '../data/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { CameraData } from '../data/camera';

@Injectable()
export class CameraService extends CameraData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL;

   
  getListCameraByInfoCamera(): Observable<any> {
    let url = this.BASE_URL + `/camerainfo/get-list-camera-by-infoCamera/`;
    return this.http.get(url).catch(this.errorHandler);
  }
  getListCameraLevelByUser(): Observable<any> {
    let url = this.BASE_URL + `/camerainfo/get-list-camera-level-by-username/`;
    return this.http.get(url).catch(this.errorHandler);
  }
    errorHandler(errorHandler: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
  
}
