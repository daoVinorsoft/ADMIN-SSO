import { Observable } from 'rxjs';

export class Role {
  id!: String;
  name!: String;
  description!: String;
  active!: Boolean;
}
export class RoleCreate {
  name!: String;
  description!: String;
  active!: Boolean;
}

export abstract class RoleData {
  abstract fetchRoles(): Observable<any>;
  abstract fetchRole(id: string): Observable<any>;
  abstract createRole(data: RoleCreate): Observable<any>;
  abstract editRole(data: Role, id: string): Observable<any>;
  abstract deleteRole(id: string): Observable<any>;
}
