import { USER } from '../constants/actionTypes';

const initialState = {}

export default (state = initialState, action) => {
  switch(action.type) {
    /* reset section */
    case USER.RESET_PASSWORD_REQUEST:
      return { ...state, isResetting: true, hasReset: false };

    case USER.RESET_PASSWORD_SUCCESS:
      return { ...state, isResetting: false, hasReset: true };

    case USER.RESET_PASSWORD_FAILURE:
      return { ...state, isResetting: false, hasReset: false };

      
    /* forgot password section */
    case USER.FORGOT_PASSWORD_REQUEST:
      return { ...state, isRequestingPasswordChange: true, hasRequested: false };

    case USER.FORGOT_PASSWORD_SUCCESS:
      return { ...state, isRequestingPasswordChange: false, hasRequested: true };

    case USER.FORGOT_PASSWORD_FAILURE:
      return { ...state, isRequestingPasswordChange: false, hasRequested: false };


    default:
      return state;
  }
}