import { USER} from '../constants/actionTypes'
import { login } from '../apiCalls/user';
import config from '../constants/config';
import { setCookie } from '../helpers/cookie';

export const loginUser = (data) => {
  return async dispatch => {
    dispatch({ type: USER.LOGIN_REQUEST });

    const response = await login(data);
    if(response.status === 200) {
      const { data } = response.data;
      setCookie(config.authCookie, data);
      dispatch({ type: USER.LOGIN_SUCCESS, payload: data });
    } else {
      dispatch({ type: USER.LOGIN_FAILURE, payload: {} });
    }
  }
}