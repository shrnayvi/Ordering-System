import qs from 'query-string';
import pick from 'lodash/pick';

import { ORDER, USER, EVENT } from '../constants/actionTypes';
import notify from '../helpers/notification';
import config from '../constants/config';
import { 
  getAll,
  // createOrder,
  editOrder,
  // getUserOrder,
} from '../apiCalls/order';


const fetchOrders = (data, dispatch) => {
  const allIds = [];
  const byId = {};

  data.orders.forEach(order => {
    const event = order.event;
    const user = order.user;

    order.event = event._id;
    order.user = user._id;

    dispatch({ type: USER.UPDATE_ENTITY, payload: user });
    dispatch({ type: EVENT.UPDATE_ENTITY, payload: event });

    allIds.push(order._id);
    byId[order._id] = order;
  });

  return { allIds, byId };

}

export const get = (args = { currentPage: 1 }) => async dispatch => {

  const query = pick(args, ['skip', 'limit'])
  dispatch({ type: ORDER.FETCH_REQUEST });

  const { data: response } = await getAll(qs.stringify(query));
  
  if(response.status === 200) {
    const data = fetchOrders(response.data, dispatch);
    const paging = response.data.paging;
    const payload = {
      ...data,
      currentPage: args.currentPage,
      pageCount: Math.ceil(paging.total / config.dataPerPage),
      total: paging.total,
      startIndex: paging.startIndex,
      endIndex: paging.endIndex,
    };

    dispatch({ type: ORDER.FETCH_ALL_SUCCESS, payload });
  } else {
    dispatch({ type: ORDER.FETCH_FAILURE, payload: response.message });
  }
}

export const edit = (_id, data) => async dispatch => {
  dispatch({ type: ORDER.EDIT_REQUEST, payload: _id });

  const { data: response } = await editOrder(_id, data);
  
  if(response.status === 200) {
    const payload = response.data;
    payload['user'] = payload.user._id;
    payload['event'] = payload.event._id;

    dispatch({ type: ORDER.EDIT_SUCCESS, payload });
  } else {
    dispatch({ type: ORDER.EDIT_FAILURE, payload: { _id, message: response.message } });
    notify('error', response.message);
  }
}

export const toggleEditState = _id => dispatch =>  {
  dispatch({ type: ORDER.TOGGLE_EDIT_STATE, payload: { _id } });
}