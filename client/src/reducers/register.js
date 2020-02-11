import { USER } from '../constants/actionTypes';

const initialState = {}

export default (state = initialState, action) => {
  switch(action.type) {
    /* add section */
    case USER.REGISTER_REQUEST:
      return { ...state, isRegistering: true, hasRegistered: false };

    case USER.REGISTER_SUCCESS:
      return { 
        ...state,
        isRegistering: false,
        hasRegistered: true,
      };
    case USER.REGISTER_FAILURE:
      return { 
        ...state,
        isRegistering: false,
        hasRegistered: false,
      };


    default:
      return state;
  }
}