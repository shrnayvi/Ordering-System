import { USER} from '../constants/actionTypes'
import { getById, update, getAll } from '../apiCalls/user';

export const getAll = _id => async dispatch => {
  dispatch({ type: USER.FETCH_ALL_REQUEST });

  const  { data: response } = await getAll();

  if(response.status === 200) {
    dispatch({ type: USER.FETCH_ALL_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: USER.FETCH_ALL_FAILURE, error: response.message });
  }
}

export const getUserById = _id => async dispatch => {
  dispatch({ type: USER.FETCH_PROFILE_REQUEST });

  const  { data: response } = await getById(_id);

  if(response.status === 200) {
    const { name, email, phone } = response.data;
    dispatch({ type: USER.FETCH_PROFILE_SUCCESS, payload: { name, email, phone }});
  } else {
    dispatch({ type: USER.FETCH_PROFILE_FAILURE, error: response.message });
  }
}

export const updateUser = (_id, data) => async dispatch => {
  dispatch({ type: USER.EDIT_PROFILE_REQUEST });

  const  { data: response } = await update(_id, data);

  if(response.status === 200) {
    dispatch({ type: USER.EDIT_PROFILE_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: USER.EDIT_PROFILE_FAILURE, error: response.message });
  }
}