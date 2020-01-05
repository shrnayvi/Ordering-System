import { USER } from '../constants/actionTypes';

export default (state = { info: {} }, action) => {
  switch(action.type) {
    case USER.FETCH_ALL_REQUEST:
    case USER.FETCH_ALL_SUCCESS:
    case USER.FETCH_ALL_FAILURE:

    case USER.EDIT_USER_REQUEST:
    case USER.EDIT_USER_SUCCESS:
    case USER.EDIT_USER_FAILURE:
    default:
      return state;
  }
}