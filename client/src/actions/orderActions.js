import { ORDER, CART } from '../constants/actionTypes';
import * as orderService from '../services/orderService';
import { addToCart } from '../services/cartService';

/**
 * Place order
 * @param {Object} data Data required to place order
 * @param {String} data.user User ID placing the order
 * @param {String} data.item Menu Item 
 */
export const placeOrder = data => async dispatch => {
  dispatch({ type: ORDER.CREATE_REQUEST });

  try {
    let { data: response } = await orderService.placeOrder(data);
    const { status, message } = response;
    if (response.status === 200) {
      dispatch({ type: CART.FLUSH });
      dispatch({ type: ORDER.CREATE_SUCCESS, payload: response });
    } else {
      dispatch({ type: ORDER.CREATE_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: ORDER.CREATE_FAILURE, payload: { status: 500, message: e.message } });
  }
}

/**
 * Fetch orders of the loggedin user
 * @param {String} userId Loggedin user
 */
export const fetchOrders = userId => async dispatch => {
  dispatch({ type: ORDER.FETCH_REQUEST });

  try {
    let { data: response } = await orderService.getUserOrder(userId);
    const { status, message } = response;
    if (response.status === 200) {
      dispatch({ type: ORDER.FETCH_SUCCESS, payload: response });
    } else {
      dispatch({ type: ORDER.FETCH_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: ORDER.FETCH_FAILURE, payload: { status: 500, message: e.message } });
  }
}

/**
 * Update the order status
 */
export const updateOrder = (_id, data) => async dispatch => {
  dispatch({ type: ORDER.UPDATE_REQUEST });

  try {
    let { data: response } = await orderService.updateOrder(_id, data);
    const { status, message } = response;
    if (response.status === 200) {
      dispatch({ type: ORDER.UPDATE_SUCCESS, payload: response });
    } else {
      dispatch({ type: ORDER.UPDATE_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: ORDER.UPDATE_FAILURE, payload: { status: 500, message: e.message } });
  }
}

/**
 * Reset Create Order State
 */
export const resetPlacedOrder = () => async dispatch => {
  dispatch({ type: ORDER.CREATE_RESET });
}

/**
 * Add to cart
 */
export const addCart = item => async dispatch => {
  dispatch({ type: CART.ADD_REQUEST });

  try {
    let { data: response } = await addToCart(item);
    const { status, message } = response;
    if (response.status === 200) {
      dispatch({ type: CART.ADD_SUCCESS, payload: response });
    } else {
      dispatch({ type: CART.ADD_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: CART.ADD_FAILURE, payload: { status: 500, message: e.message } });
  }
}