import omit from 'lodash/omit';
import { USER } from '../constants/actionTypes';
import { setCookie, destroyCookie } from '../helpers/cookie';
import * as userService from '../services/userService';
import history from '../helpers/history';
import routes from '../constants/routes';

/**
 * 
 * @param {String} fetchType ['profile', 'user']
 */
export const fetchUser = (_id, fetchType = 'profile') => async (dispatch) => {
  try {
    const { data: response } = await userService.getById(_id);
    const { status, data } = response;
    if (status === 200) {
      if(fetchType === 'profile') {
        dispatch({ type: USER.FETCH_PROFILE, payload: data, });
      } else if(fetchType === 'user') {
        dispatch({ type: USER.FETCH_USER, payload: data, });
      }
    } else {
      dispatch({ type: USER.FETCH_FAILURE });
    }
  } catch (e) {
    dispatch({ type: USER.FETCH_ERROR, payload: e.message });
  }
}

export const fetchAllUsers = (page = null) => async dispatch => {
  dispatch({ type: USER.FETCH_ALL_REQUEST })
  try {
    const query = page ? `page=${page}`: null
    const { data: response } = await userService.getAll(query);
    const { status, message } = response;
    if (status === 200) {
      dispatch({ type: USER.FETCH_ALL_SUCCESS, payload: response });
    } else {
      dispatch({ type: USER.FETCH_ALL_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: USER.FETCH_ALL_FAILURE, payload: e.message });
  }
}

/**
 * @param {String} editType - ['profile', 'user-edit']
 */
export const editProfile = (_id, userData, editType = 'profile') => async dispatch => {
  dispatch({ type: USER.EDIT_REQUEST });
  try {
    const { data: response } = await userService.update(_id, userData);
    const { status, message, data } = response;

    if (status === 200) {
      let actionType = USER.EDIT_PROFILE_SUCCESS;
      if(editType === 'user-edit') {
        actionType = USER.EDIT_USER_SUCCESS; 
      }
      
      dispatch({ type: actionType, payload: { status, message, profile: data } });

    } else {
      dispatch({ type: USER.EDIT_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: USER.EDIT_FAILURE, payload: { message: e.message } });
  }
}

export const removeUser = _id => async dispatch => {
  dispatch({ type: USER.DELETE_REQUEST});
  try {
    const { data: response } = await userService.remove(_id);
    const { status, message } = response;
    if (status === 200) {
      dispatch({ type: USER.DELETE_SUCCESS,
        payload: {
          status,
          message,
          _id,
        }
      });
    } else {
      dispatch({ type: USER.DELETE_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: USER.DELETE_FAILURE, payload: { message: e.message } });
  }
}

export const handleInputChange = data => async dispatch => {
  data = omit(data, ['email', 'password']);
  dispatch({ type: USER.HANDLE_INPUT_CHANGE, payload: data });
}

export const handleEditInputChange = data => async dispatch => {
  data = omit(data, ['email', 'password']);
  dispatch({ type: USER.HANDLE_EDIT_INPUT_CHANGE, payload: data });
}

export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch({ type: USER.LOGIN_REQUEST });

  try {
    const { data: { status, data, message } } = await userService.login({ email, password });
    if (status === 200) {
      let { token, user } = data;
      let cookieValue = JSON.stringify({ token, user });
      setCookie('order', cookieValue, { path: '/' });
      dispatch({ type: USER.LOGIN_SUCCESS, payload: { user } });
      history.push(routes.DASHBOARD(user.role));
    } else {
      dispatch({ type: USER.LOGIN_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: USER.LOGIN_FAILURE, payload: e.message });
  }
}

export const loginWithGoogle = accessToken => async (dispatch) => {
  dispatch({ type: USER.LOGIN_REQUEST });

  try {
    const { data: { status, data, message } } = await userService.loginWithGoogle({ access_token: accessToken });
    if (status === 200) {
      let { token, user } = data;
      let cookieValue = JSON.stringify({ token, user });
      setCookie('order', cookieValue, { path: '/' });
      dispatch({ type: USER.LOGIN_SUCCESS, payload: { user } });
      history.push(routes.DASHBOARD(user.role));
    } else {
      dispatch({ type: USER.LOGIN_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: USER.LOGIN_FAILURE, payload: e.message });
  }
}

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: USER.LOGOUT_REQUEST });

  destroyCookie('order');
  dispatch({ type: USER.LOGOUT_SUCCESS });
}

export const clearLogin = () => async dispatch => {
  dispatch({ type: USER.LOGIN_CLEAR });
}

export const clearRegister = () => async dispatch => {
  dispatch({ type: USER.REGISTER_CLEAR });
}

export const emailVerification = type => async dispatch => {
  if (type === 'success') {
    dispatch({ type: USER.VERIFICATION_SUCCESS });
  } else if (type === 'error') {
    dispatch({ type: USER.VERIFICATION_ERROR });
  } else if (type === 'clear') {
    dispatch({ type: USER.VERIFICATION_CLEAR });
  }
}

export const registerUser = userData => async dispatch => {
  dispatch({ type: USER.REGISTER_REQUEST });

  try {
    const { data: response } = await userService.register(userData);
    if (response.status === 200) {
      dispatch({ type: USER.REGISTER_SUCCESS, payload: response });
    } else {
      dispatch({ type: USER.REGISTER_FAILURE, payload: response });
    }

  } catch (e) {
    dispatch({ type: USER.REGISTER_FAILURE, payload: { status: 500, message: e.message } });
  }
}

export const forgotPassword = ({ email }) => async (dispatch) => {
  dispatch({ type: USER.FORGOT_PASSWORD_REQUEST });

  try {
    const { data: response } = await userService.forgotPassword({ email });
    if (response.status === 200) {
      dispatch({ type: USER.FORGOT_PASSWORD_SUCCESS, payload: response.status });
      history.push(routes.RESET_PASSWORD);
    } else {
      dispatch({ type: USER.FORGOT_PASSWORD_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch (e) {
    dispatch({ type: USER.FORGOT_PASSWORD_FAILURE, payload: { status: 500, message: e.message } });
  }
}

export const resetPassword = (resetData) => async (dispatch) => {
  dispatch({ type: USER.RESET_PASSWORD_REQUEST });

  try {
    const { data: response } = await userService.resetPassword(resetData);
    if (response.status === 200) {
      dispatch({ type: USER.RESET_PASSWORD_SUCCESS, payload: response.status });
      history.push(routes.LOGIN);
    } else {
      dispatch({ type: USER.RESET_PASSWORD_FAILURE, payload: { status: response.status, message: response.message } });
    }

  } catch (e) {
    dispatch({ type: USER.RESET_PASSWORD_FAILURE, payload: { status: 500, message: e.message } });
  }
}

export const resetStatus = () => async dispatch => {
  dispatch({ type: USER.RESET_STATUS });
}
