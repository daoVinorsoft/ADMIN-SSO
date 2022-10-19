import { Observable } from 'rxjs';

export class Group {
  id!: String;
  name!: String;
  description!: String;
  active!: Boolean;
}
export class GroupCreate {
  name!: String;
  description!: String;
  active!: Boolean;
}

export abstract class GroupData {
  abstract fetchGroups(): Observable<any>;
  abstract fetchGroup(id: string): Observable<any>;
  abstract createGroup(data: GroupCreate): Observable<any>;
  abstract editGroup(data: Group, id: string): Observable<any>;
  abstract deleteGroup(id: string): Observable<any>;
}
