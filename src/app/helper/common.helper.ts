import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import 'moment/locale/pt-br';

// Function hỗ trợ lấy thông tin user từ localStorage
export const getUserInfo = () => {
  return localStorage.getItem('userInfo');
};

// Decode token từ localStorage sau khi Login
export const decodeJWT = () => {
  if (localStorage.getItem('userToken')) {
    let decoded = jwtDecode(String(localStorage.getItem('userToken')));
    return decoded;
  } else {
    window.location.href = '/auth/login';
    return null;
  }
};

// Convert date from server to client
export const formatedDate = (dateVal: any) => {
  return moment(dateVal).isValid()
    ? moment(dateVal).format('DD-MM-YYYY')
    : '--';
};
