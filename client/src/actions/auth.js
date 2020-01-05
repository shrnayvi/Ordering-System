import { USER} from '../constants/actionTypes'
import { login } from '../apiCalls/user';
import config from '../constants/config';
import { setCookie, destroyCookie } from '../helpers/cookie';
import history from '../helpers/history';
import notify from '../helpers/notification';


export const loginUser = (data) => {
  return async dispatch => {
    dispatch({ type: USER.LOGIN_REQUEST });

    const { data: response } = await login(data);
    if(response.status === 200) {
      const { data } = response;
      setCookie(config.authCookie, data);
      dispatch({ type: USER.LOGIN_SUCCESS, payload: data });
      notify('success', response.message);
      setTimeout(() => {
        history.push(`/${data.user.role}`)
      }, 3000);
    } else {
      notify('error', response.message);
      dispatch({ type: USER.LOGIN_FAILURE, payload: {} });
    }
  }
}

export const logoutUser = _ => async (dispatch) => {
  dispatch({ type: USER.LOGOUT_REQUEST });

  destroyCookie(config.authCookie);
  dispatch({ type: USER.LOGOUT_SUCCESS });
}