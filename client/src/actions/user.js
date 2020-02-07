import qs from 'query-string';
import pick from 'lodash/pick';

import config from '../constants/config';
import { USER} from '../constants/actionTypes'
import { MEDIA } from "../constants/actionTypes";
import { 
  getById, 
  update, 
  getAll as getUsers, 
  register,
  remove,
} from '../apiCalls/user';
import notify from '../helpers/notification';

const fetchUsers = (data, dispatch) => {
  const byId = {},
    allIds = [];

  data.users.forEach(user => {
    allIds.push(user._id)
    if(user.avatar) {
      const media = user.avatar;
      user['avatar'] = media._id;
      dispatch({ type: MEDIA.UPDATE_MEDIA, payload: media });
    }
    byId[user._id] = user;
  });

  return {
    allIds,
    byId,
  };
}

export const getAll = (args = { currentPage: 1 }) => async dispatch => {
  dispatch({ type: USER.FETCH_ALL_REQUEST });

  const query = pick(args, ['skip', 'limit']);
  const  { data: response } = await getUsers(qs.stringify(query));

  if(response.status === 200) {
    let data = fetchUsers(response.data, dispatch);
    const paging = response.data.paging;
    data = {
      ...data,
     pageCount: Math.ceil(paging.total / config.dataPerPage ),
     total: paging.total,
     startIndex: paging.startIndex,
     endIndex: paging.endIndex, 
    };

    dispatch({ type: USER.FETCH_ALL_SUCCESS, payload: data });
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

export const addUser = data => async dispatch => {
  dispatch({ type: USER.ADD_USER_REQUEST });

  const  { data: response } = await register(data);

  if(response.status === 200) {
    dispatch({ type: USER.ADD_USER_SUCCESS, payload: response.data });
    dispatch({ type: MEDIA.CLEAR_UPLOADED_MEDIA });
    notify('success', response.message);
  } else {
    dispatch({ type: USER.ADD_USER_FAILURE, error: response.message });
    notify('error', response.message)
  }
}

export const toggleEditState = _id => async dispatch => {
  dispatch({ type: USER.TOGGLE_EDIT_STATE, payload: {_id } });
}

export const updateUser = (_id, data) => async dispatch => {
  dispatch({ type: USER.EDIT_USER_REQUEST });

  const  { data: response } = await update(_id, data);

  if(response.status === 200) {
    dispatch({ type: USER.EDIT_USER_SUCCESS, payload: response.data });
    notify('success', response.message)
  } else {
    dispatch({ type: USER.EDIT_USER_FAILURE, error: response.message });
    notify('error', response.message)
  }
}

export const removeUser = _id => async dispatch => {
  dispatch({ type: USER.REMOVE_REQUEST, payload: { _id } });

  const  { data: response } = await remove(_id);

  if(response.status === 200) {
    dispatch({ type: USER.REMOVE_SUCCESS, payload: response.data });
    notify('success', response.message)
  } else {
    dispatch({ type: USER.REMOVE_FAILURE, error: response.message });
    notify('error', response.message)
  }
}

export const fillRemainingDataWhenRemoving = args => async dispatch => {
  const { data: response } = await getUsers(qs.stringify(args));
  console.log(response, args);
  
  if(response.status === 200) {
    let data = fetchUsers(response.data, dispatch);

    dispatch({ 
      type: USER.FILL_REMAINING_DATA, 
      payload: data,
    });
  }
};
