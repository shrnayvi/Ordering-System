import { USER } from '../constants/actionTypes';
import { setCookie, destroyCookie } from '../helpers/cookie';
import * as userService from '../services/userService';
import history from '../helpers/history';
import routes from '../constants/routes';

export const fetchUser = () => async (dispatch) => {
   try {
      const { data: { data } } =  await userService.getById('5ca4efe333131835798342e9');
      dispatch({ type: USER.FETCH_USER, payload: data});
   } catch(e) {
      dispatch({ type: USER.FETCH_ERROR, payload: e.message });
   }
}

export const loginUser = ({ email, password }) => async (dispatch) => {
   dispatch({ type: USER.LOGIN_REQUEST });

   try {
      const { data: { status, data, message }} =  await userService.login({ email, password });
      if(status === 200) {
         setCookie('order', data.token, { path: '/' });
         dispatch({ type: USER.LOGIN_SUCCESS, payload: { status, message }});
         history.push(routes.DASHBOARD);
      } else {
         dispatch({ type: USER.LOGIN_FAILURE, payload: { status, message } });
      }
   } catch(e) {
      dispatch({ type: USER.LOGIN_FAILURE, payload: e.message });
   }
}

export const logoutUser = () => async (dispatch) => {
   dispatch({ type: USER.LOGOUT_REQUEST });

   destroyCookie('order');
   dispatch({ type: USER.LOGOUT_SUCCESS });
}

export const registerUser = (userData) => async (dispatch) => {
   dispatch({ type: USER.REGISTER_REQUEST });

   try {
      const { data: response } = await userService.register(userData);
      if(response.status === 200) {
         dispatch({ type: USER.REGISTER_SUCCESS });
      } else {
         dispatch({ type: USER.REGISTER_FAILURE, payload: response });
      }

   } catch(e) {
      dispatch({ type: USER.REGISTER_FAILURE, payload: { status: 500, message: e.message }});
   }
}

export const forgotPassword = ({ email }) => async (dispatch) => {
   dispatch({ type: USER.FORGOT_PASSWORD_REQUEST});

   try {
      const { data: response } = await userService.forgotPassword({ email });
      if(response.status === 200) {
         dispatch({ type: USER.FORGOT_PASSWORD_SUCCESS, payload: response.status });
         history.push(routes.RESET_PASSWORD);
      } else {
         dispatch({ type: USER.FORGOT_PASSWORD_FAILURE, payload: { status: response.status, message: response.message } });
      }
   } catch(e) {
         dispatch({ type: USER.FORGOT_PASSWORD_FAILURE, payload: { status: 500, message: e.message } });
   }
}

export const resetPassword = (resetData) => async (dispatch) => {
   dispatch({ type: USER.RESET_PASSWORD_REQUEST});

   try {
      const { data: response } = await userService.resetPassword(resetData);
      if(response.status === 200) {
         dispatch({ type: USER.RESET_PASSWORD_SUCCESS, payload: response.status });
         history.push(routes.LOGIN);
      } else {
         dispatch({ type: USER.RESET_PASSWORD_FAILURE, payload: { status: response.status, message: response.message } });
      }

   } catch(e) {
      dispatch({ type: USER.RESET_PASSWORD_FAILURE, payload: { status: 500, message: e.message } });
   }
}