import { USER } from '../constants/actionTypes';

const initialState = { 
  profile: {},  
  userList: [],
  editInformation: {},
};


export default (state = initialState, action) => {
  switch (action.type) {
    /* Reset status, message and the requesting and completed status */
    case USER.RESET_STATUS:
      return {
        ...state,
        status: null,
        message: "",
        hasEdited: null,
        isEditing: null,
        fetchingUsers: null,
        fetchedUsers: null,
      }

    /* Single User */
    case USER.FETCH_USER:
      return { 
        ...state,
        profile: { ...action.payload } 
      };
    case USER.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };
    case USER.EDIT_REQUEST:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
        isEditing: true,
      };
    case USER.EDIT_SUCCESS:
      return {
        ...state,
        hasEdited: true,
        isEditing: false,
        status: action.payload.status,
        message: action.payload.message,
        profile: { ...state.profile, ...action.payload.profile },
      };
    case USER.EDIT_FAILURE:
      return {
        ...state,
        hasEdited: false,
        isEditing: false,
        profile: { ...state.profile },
        status: action.payload.status,
        message: action.payload.message,
      };

    /** Fetch all users */
    case USER.FETCH_ALL_REQUEST:
      return {
        ...state,
        fetchingUsers: true,
      }
    case USER.FETCH_ALL_SUCCESS:
      return {
        ...state,
        fetchingUsers: false,
        fetchedUsers: true,
        message: action.payload.message,
        userList: action.payload.data,
      }
    case USER.FETCH_ALL_FAILURE:
      return {
        ...state,
        fetchingUsers: false,
        fetchedUsers: false,
        status: action.payload.status,
        message: action.payload.message,
      }

    default:
      return state;
  }
};