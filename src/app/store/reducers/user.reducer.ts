// import the interface
import { GetUserInforAction, UserActionType } from '../actions/user.action';
import { UserInfor } from '../models/user.model';
//create a dummy initial state
const initialState: Array<UserInfor> = [
    {
      CODE: "20220926000000000002",
      USERNAME: "camera",
      NAME: "Camera Name",
      EDIT_TIME: "2022-10-01T00:02:31",
      ADDRESS_DETAIL: "S¿ 43 Hoàng Qu¿c Vi¿t",
      COMMUNE_NAME: "Xã Vạn Kim",
      DISTRICT_NAME: "Huyện Mỹ Đức",
      PROVINCE_NAME: "Thành phố Hà Nội",
      COMPANY_NAME: "Vinorsoft",
      NATION_NAME: "Việt Nam",
      BIRTHDAY: "2002-10-12T00:00:00",
      EMAIL: "camera@email.com",
      PHONE: "0123456789",
      STAFF_POSITTION_NAME: "test Staff Position",
      USERTYPE_NAME: "Admin",
      USERTYPE_CODE: "300920220001",
      DATE_JOINED: "2022-09-26T16:31:30"
    }
  ]
export function UserReducer( state = initialState, action: any ) {
  switch (action.type) {
    case UserActionType.GET_USER:
      return [...state, action.payload];
    default:
      return state;
  }
}