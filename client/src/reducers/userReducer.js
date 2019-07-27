import { USER } from '../constants/actionTypes';

const initialState = { information: {} };
export default (state = initialState, action) => {
  switch (action.type) {
    case USER.FETCH_USER:
      return { information: { ...action.payload } };
    case USER.HANDLE_INPUT_CHANGE:
      return {
        information: { ...state.information, ...action.payload }
      };
    case USER.EDIT_REQUEST:
      return {
        information: { ...state.information, ...action.payload },
        isEditing: true,
      };
    case USER.EDIT_SUCCESS:
      return {
        status: action.payload.status,
        message: action.payload.message,
        information: { ...state.information, ...action.payload.information },
      };
    case USER.EDIT_FAILURE:
      return {
        information: { ...state.information },
        hasEdited: true,
        status: action.payload.status,
        message: action.payload.message,
      };
    default:
      return state;
  }
};