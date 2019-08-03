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
        deletingUser: null,
        deletedUser: null,
        editInformation: {},
      }

    /* Single User */
    case USER.FETCH_PROFILE:
      return { 
        ...state,
        profile: { ...action.payload },
      };

    case USER.FETCH_USER:
      return { 
        ...state,
        editInformation: { ...action.payload } 
      };

    case USER.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };

    case USER.HANDLE_EDIT_INPUT_CHANGE:
      return {
        ...state,
        editInformation: { ...state.editInformation, ...action.payload }
      };

    case USER.EDIT_REQUEST:
      return {
        ...state,
        isEditing: true,
      };

    case USER.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        hasEdited: true,
        isEditing: false,
        status: action.payload.status,
        message: action.payload.message,
        profile: { ...state.profile, ...action.payload.profile },
      };

    case USER.EDIT_USER_SUCCESS:
      return {
        ...state,
        hasEdited: true,
        isEditing: false,
        status: action.payload.status,
        message: action.payload.message,
        editInformation: { ...state.editInformation, ...action.payload.profile },
      };

    case USER.EDIT_FAILURE:
      return {
          ...state,
          hasEdited: false,
          isEditing: false,
          status: action.payload.status,
          message: action.payload.message,
      }

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

    /** Delete user */
    case USER.DELETE_REQUEST:
      return {
        ...state,
        deletingUser: true,
      }
    case USER.DELETE_SUCCESS:
      let newUser = Object.assign([], state.userList.filter(usr => usr._id !== action.payload._id));
      return {
        ...state,
        deletingUser: false,
        deletedUser: true,
        message: action.payload.message,
        userList: newUser,
      }
    case USER.DELETE_FAILURE:
      return {
        ...state,
        deletingUser: false,
        deletedUser: false,
        status: action.payload.status,
        message: action.payload.message,
      }

    default:
      return state;
  }
};