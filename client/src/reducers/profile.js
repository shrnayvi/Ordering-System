import { USER } from '../constants/actionTypes';

export default (state = { info: {} }, action) => {
  switch(action.type) {
    case USER.FETCH_PROFILE_REQUEST:
      return { ...state, isFetchingProfile: true };
    case USER.FETCH_PROFILE_SUCCESS:
      return { isFetchingProfile: false, info: action.payload };
    case USER.FETCH_PROFILE_FAILURE:
      return { ...state, isFetchingProfile: false }

    case USER.EDIT_PROFILE_REQUEST:
      return { ...state, isEditingProfile: true, };
    case USER.EDIT_PROFILE_SUCCESS:
      const { name, phone } = action.payload;
      return { info: { ...state.info, name, phone }, isEditingProfile: false };
    case USER.EDIT_PROFILE_FAILURE:
      return { ...state, isEdtingProfile: false }

    case USER.HANDLE_PROFILE_INPUT:
      return { ...state, info: { ...state.info, ...action.payload }};
    default:
      return state;
  }
}