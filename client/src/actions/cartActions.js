import { CART } from "../constants/actionTypes";
import * as cartService from "../services/cartService";

export const fetchCart = () => async dispatch => {
  dispatch({ type: CART.FETCH_REQUEST });

  try {
    let { data: response } = await cartService.getCart();
    if(response.status === 200) {
      dispatch({ type: CART.FETCH_SUCCESS, payload: response });
    } else {
      dispatch({ type: CART.FETCH_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: CART.FETCH_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const removeFromCart = (_id) => async dispatch => {
  dispatch({ type: CART.REMOVE_REQUEST });

  try {
    let { data: response } = await cartService.removeFromCart(_id);
    if(response.status === 200) {
      dispatch({ type: CART.REMOVE_SUCCESS, payload: { _id: response.data._id }});
    } else {
      dispatch({ type: CART.REMOVE_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: CART.REMOVE_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const changeQuantity = (_id, quantity) => async dispatch => {
  dispatch({ type: CART.CHANGE_QUANTITY, payload: { _id, quantity } });
}

export const resetStatus = () => async dispatch => {
  dispatch({ type: CART.RESET_STATUS });
}