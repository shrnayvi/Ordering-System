import { USER } from '../constants/actionTypes';
import { getCookie } from '../helpers/cookie';

const token = getCookie('order');


const initialState = {
   isLoggedIn: token ? true : false,
}
export default (state = initialState, action) => {
   switch(action.type) {
      case USER.LOGIN_REQUEST:
         return {
            isLogging: true,
         }
      case USER.LOGIN_SUCCESS:
         return {
            isLoggedIn: true,
         }
      case USER.LOGIN_FAILURE:
         return {
            isLogging: false,
         };
      default:
         return state;
   }
}