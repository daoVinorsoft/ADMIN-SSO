import { Observable } from 'rxjs';

export class UserGroup {
  id!: String;
  user_id!: String;
  group_id!: String;
}
export class UserGroupCreate {
  user_id!: String;
  group_id!: String;
}

export abstract class UserGroupData {
  abstract fetchUserGroups(): Observable<any>;
  abstract fetchUserGroup(id: string): Observable<any>;
  abstract createUserGroup(data: UserGroupCreate): Observable<any>;
  abstract editUserGroup(data: UserGroup, id: string): Observable<any>;
  abstract deleteUserGroup(id: string): Observable<any>;
}
