import { USER } from '../constants/actionTypes';

export default (state = {}, action) => {
   switch(action.type) {
      case USER.REGISTER_REQUEST:
         return { isRegistering: true };
      case USER.REGISTER_SUCCESS:
         return { hasRequested: true, status: action.payload.status };
      case USER.REGISTER_FAILURE:
         const { status, message } = action.payload;
         return { hasRequested: true, status, message };
      default: 
         return state;
   }
}