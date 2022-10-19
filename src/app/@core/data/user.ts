import { AbstractTable } from 'ng-zorro-antd/date-picker/lib/abstract-table';
import { Observable } from 'rxjs';

export class User {
  id!: String;
  fullname!: String;
  address!: String;
  email!: String;
  username!: String;
  birthday!: String;
  phone_number!: String;
  createdAt!: String;
  enabled!: Boolean;
}
export class UserCreate {
  fullname!: String;
  address!: String;
  email!: String;
  username!: String;
  birthday!: String;
  phone_number!: String;
  createdAt!: String;
  enabled!: Boolean;
}

export class UserEdit {
  id!: String;
  fullname!: String;
  address!: String;
  email!: String;
  username!: String;
  birthday!: String;
  phone_number!: String;
  enabled!: Boolean;
}

export abstract class UserData {
  abstract fetchUsers(): Observable<any>;
  abstract fetchUser(id: string): Observable<any>;
  abstract createUser(data: UserCreate): Observable<any>;
  abstract editUser(data: UserEdit, id: string): Observable<any>;
  abstract deleteUser(id: string): Observable<any>;
}

export abstract class CameraData {
  
}
