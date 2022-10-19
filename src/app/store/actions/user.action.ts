import { Action } from '@ngrx/store';
import { UserInfor } from '../models/user.model';
export enum UserActionType {
  GET_USER = '[GETUSER] get user infor',
}
export class GetInforAction implements Action {
  readonly type = UserActionType.GET_USER;
  //add an optional payload
  constructor(public payload: UserInfor) {}
}
export type GetUserInforAction = GetInforAction;