import qs from 'query-string';

import { EVENT } from '../constants/actionTypes';
import { 
  getAll,
  addEvent,
  editEvent,
  removeEvent,
} from '../apiCalls/event';

import notify from '../helpers/notification';
import config from '../constants/config';

const fetchEvents = data => {
  const allIds = [];
  const byId = {};

  data.events.forEach(event => {
    allIds.push(event._id);
    byId[event._id] = event;
  });

  return { allIds, byId };

}

export const get = (args = { currentPage: 1 }) => async dispatch => {

  const { currentPage, ...query } = args;
  dispatch({ type: EVENT.FETCH_REQUEST });

  const { data: response } = await getAll(qs.stringify(query));
  
  if(response.status === 200) {
    const data = fetchEvents(response.data, dispatch);
    const paging = response.data.paging;
    const payload = {
      ...data,
      currentPage: currentPage,
      pageCount: Math.ceil(paging.total / config.dataPerPage),
      total: paging.total,
      startIndex: paging.startIndex,
      endIndex: paging.endIndex,
    };

    dispatch({ type: EVENT.FETCH_ALL_SUCCESS, payload });
  } else {
    dispatch({ type: EVENT.FETCH_FAILURE, payload: response.message });
  }
}

export const add = (data, opts = {}) => async dispatch => {
  dispatch({ type: EVENT.ADD_REQUEST});

  const { data: response } = await addEvent(data);
  
  if(response.status === 200) {
    const event = response.data;
    let _id = [];
    if(opts.currentPage && opts.currentPage === 1) {
      _id = [ event._id ];
    }

    dispatch({ type: EVENT.ADD_SUCCESS, payload: { data: event, _id } });
  } else {
    dispatch({ type: EVENT.ADD_FAILURE, payload: response.message });
    notify('error', response.message);
  }
}

export const edit = (_id, data) => async dispatch => {
  dispatch({ type: EVENT.EDIT_REQUEST, payload: _id });

  const { data: response } = await editEvent(_id, data);
  
  if(response.status === 200) {
    dispatch({ type: EVENT.EDIT_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: EVENT.EDIT_FAILURE, payload: { _id, message: response.message } });
    notify('error', response.message);
  }
}

export const remove = _id => async dispatch => {
  dispatch({ type: EVENT.REMOVE_REQUEST, payload: { _id } });

  const { data: response } = await removeEvent(_id);
  
  if(response.status === 200) {
    dispatch({ type: EVENT.REMOVE_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: EVENT.REMOVE_FAILURE, payload: { _id, message: response.message } });
    notify('error', response.message);
  }
}

export const toggleEditState = _id => dispatch =>  {
  dispatch({ type: EVENT.TOGGLE_EDIT_STATE, payload: { _id } });
}

export const removeLastId = _id => dispatch => {
  dispatch({ type: EVENT.REMOVE_LAST_ID })
}

export const fillRemainingDataWhenRemoving = args => async dispatch => {
  const { data: response } = await getAll(qs.stringify(args));
  
  if(response.status === 200) {
    let data = fetchEvents(response.data, dispatch);

    dispatch({ 
      type: EVENT.FILL_REMAINING_DATA, 
      payload: data,
    });
  }
};
