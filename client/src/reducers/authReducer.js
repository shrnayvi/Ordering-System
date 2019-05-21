import { USER } from '../constants/actionTypes';
import authHeader from '../helpers/authHeader';

const { token, user } = authHeader();

const initialState = {
   isLoggedIn: token ? true : false,
   user: user ? user : false,
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
            user: action.payload.user,
         }
      case USER.LOGIN_FAILURE:
         return {
            isLogging: false,
            loginFailure: true,
            status: action.payload.status,
            message: action.payload.message
         };
      case USER.LOGOUT_REQUEST:
         return {
            isLoggingOut: true,
         };
      case USER.LOGOUT_SUCCESS:
         return {
            isLoggedIn: false,
         };
      case USER.VERIFICATION_SUCCESS:
         return {
            emailVerificationMessage: 'Email Verification Successful. Please use your credentials to login'
         };
      case USER.VERIFICATION_ERROR:
         return {
            emailVerificationMessage: 'Email Verification Failed',
         };
      case USER.VERIFICATION_CLEAR:
         return {
            ...state, emailVerificationMessage: null,
         };
      default:
         return {};
   }
}