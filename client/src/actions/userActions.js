import { USER } from '../constants/actionTypes';
import { setCookie } from '../helpers/cookie';
import * as userService from '../services/userService';

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
      const { data: { data } } =  await userService.login({ email, password });
      setCookie('order', data.token);
      dispatch({ type: USER.LOGIN_SUCCESS, payload: data });
   } catch(e) {
      dispatch({ type: USER.LOGIN_FAILURE, payload: e.message });
   }
}