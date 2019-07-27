import { USER } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case USER.RESET_PASSWORD_REQUEST:
      return { isResetting: true };
    case USER.RESET_PASSWORD_SUCCESS:
      return { hasRequested: true, status: action.payload };
    case USER.RESET_PASSWORD_FAILURE:
      return { hasRequested: true, status: action.payload.status, message: action.payload.message };
    default:
      return state;
  }
}