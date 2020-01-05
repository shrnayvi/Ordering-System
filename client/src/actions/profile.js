import omit from 'lodash/omit';

import { USER} from '../constants/actionTypes'
import { getById, update } from '../apiCalls/user';
import notify from '../helpers/notification';


export const getProfile = _id => async dispatch => {
  dispatch({ type: USER.FETCH_PROFILE_REQUEST });

  const  { data: response } = await getById(_id);

  if(response.status === 200) {
    const { name, email, phone } = response.data;
    dispatch({ type: USER.FETCH_PROFILE_SUCCESS, payload: { name, email, phone }});
  } else {
    dispatch({ type: USER.FETCH_PROFILE_FAILURE, error: response.message });
  }
}

export const updateProfile = (_id, data) => async dispatch => {
  dispatch({ type: USER.EDIT_PROFILE_REQUEST });

  data = omit(data, ['email', 'password']);
  const  { data: response } = await update(_id, data);
  const { name,  phone } = response.data;

  if(response.status === 200) {
    dispatch({ type: USER.EDIT_PROFILE_SUCCESS, payload: { name, phone } });
    notify('success', response.message)
  } else {
    dispatch({ type: USER.EDIT_PROFILE_FAILURE, error: response.message });
    notify('error', response.message)
  }
}

export const handleProfileInput = (name, value) => async dispatch => {
  dispatch({ type: USER.HANDLE_PROFILE_INPUT, payload: { [name]: value } })
}