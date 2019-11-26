import { USER } from '../constants/actionTypes';
import header from '../helpers/authHeader';

const { token, user } = header();
const initialState = token ? { isLoggedIn: true, user } : {};

export default (state = initialState, action) => {
  switch(action.type) {
    case USER.LOGIN_REQUEST:
      return { isLogging: true };
    case USER.LOGIN_SUCCESS:
      return { isLoggedIn: true, isLogging: false, user: action.payload.user };
    case USER.LOGIN_FAILURE:
      return { isLoggedIn: false, isLogging: false };
    default: 
      return state;
  }
}