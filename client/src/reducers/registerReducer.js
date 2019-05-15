import { USER } from '../constants/actionTypes';

export default (state = {}, action) => {
   switch(action.type) {
      case USER.REGISTER_REQUEST:
         return { isRegistering: true };
      case USER.REGISTER_SUCCESS:
         return {};
      case USER.REGISTER_ERROR:
         return { error: action.payload };
      case USER.REGISTER_FAILURE:
         return {};
      default: 
         return state;
   }
}