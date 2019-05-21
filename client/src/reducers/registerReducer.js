import { USER } from '../constants/actionTypes';

export default (state = {}, action) => {
   switch(action.type) {
      case USER.REGISTER_CLEAR:
         return {};
      case USER.REGISTER_REQUEST:
         return { isRegistering: true };
      case USER.REGISTER_SUCCESS:
         const { status, message } = action.payload;
         return { hasRequested: true, message, status };
      case USER.REGISTER_FAILURE:
         const { status: sts, message: msg } = action.payload;
         return { hasRequested: true, status: sts, message: msg };
      default: 
         return state;
   }
}