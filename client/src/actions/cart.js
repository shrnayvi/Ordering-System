import qs from 'query-string';
import pick from 'lodash/pick';

import { CART } from '../constants/actionTypes';
import { 
  getCart,
  addToCart,
  removeFromCart,
} from '../apiCalls/cart';

import notify from '../helpers/notification';
import config from '../constants/config';

const fetchCart = data => {
  const allIds = [];
  const byId = {};
  const orders = [];

  data.cart.forEach(cart => {
    allIds.push(cart._id);
    byId[cart._id] = cart;
    orders.push({ item: cart.item._id, quantity: cart.quantity });
  });

  return { allIds, byId, orders };

}

export const get = (args = { currentPage: 1 }) => async dispatch => {

  const query = pick(args, ['skip', 'limit'])
  dispatch({ type: CART.FETCH_REQUEST });

  const { data: response } = await getCart(qs.stringify(query));
  
  if(response.status === 200) {
    const data = fetchCart(response.data, dispatch);
    const paging = response.data.paging;

    const payload = {
      ...data,
      currentPage: args.currentPage,
      pageCount: Math.ceil(paging.total / config.dataPerPage),
      total: paging.total,
      startIndex: paging.startIndex,
      endIndex: paging.endIndex,
    };

    dispatch({ type: CART.FETCH_SUCCESS, payload });
  } else {
    dispatch({ type: CART.FETCH_FAILURE, payload: response.message });
  }
}

export const add = (data, opts = {}) => async dispatch => {
  dispatch({ type: CART.ADD_REQUEST});

  const { data: response } = await addToCart(data);
  
  if(response.status === 200) {
    const cart = response.data;
    let _id = [];
    if(opts.currentPage && opts.currentPage === 1) {
      _id = [cart._id ];
    }

    dispatch({ type: CART.ADD_SUCCESS, payload: { data: cart, _id } });
    notify('success', response.message);
  } else {
    dispatch({ type: CART.ADD_FAILURE, payload: response.message });
    notify('error', response.message);
  }
}

export const remove = _id => async dispatch => {
  dispatch({ type: CART.REMOVE_REQUEST, payload: { _id } });

  const { data: response } = await removeFromCart(_id);
  
  if(response.status === 200) {
    dispatch({ type: CART.REMOVE_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: CART.REMOVE_FAILURE, payload: { _id, message: response.message } });
    notify('error', response.message);
  }
}

export const editQuantity = (_id, quantity) => dispatch => {
  dispatch({ type: CART.CHANGE_QUANTITY, payload: { _id, quantity } });
}

export const selectEvent = event => dispatch => {
  dispatch({ type: CART.SELECT_EVENT, payload: event });
}

export const changeCombinedOrder = combinedOrder => dispatch => {
  dispatch({ type: CART.CHANGE_COMBINED_ORDER, payload: combinedOrder });
}

export const fillRemainingDataWhenRemoving = args => async dispatch => {
  const { data: response } = await getCart(qs.stringify(args));
  
  if(response.status === 200) {
    let data = fetchCart(response.data, dispatch);

    dispatch({ 
      type: CART.FILL_REMAINING_DATA, 
      payload: data,
    });
  }
};
