import { USER } from '../constants/actionTypes';

export default (state = {}, action) => {
   switch(action.type) {
      case USER.RESET_PASSWORD_REQUEST:
         return { isResetting: true };
      case USER.RESET_PASSWORD_SUCCESS:
         return { status: action.payload };
      case USER.RESET_PASSWORD_ERROR:
         return { status: action.payload.status, error: action.payload.error };
      case USER.RESET_PASSWORD_FAILURE:
         return {};
      default: 
         return state;
   }
}