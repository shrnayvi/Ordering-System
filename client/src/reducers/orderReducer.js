import { findIndex } from 'lodash';
import { ORDER } from "../constants/actionTypes";

const initialState = {
  status: null,
  message: "",
  userOrders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    /* Place Order */
    case ORDER.CREATE_REQUEST:
      return {
        ...state,
        placingOrder: true
      };
    case ORDER.CREATE_SUCCESS:
      return {
        ...state,
        placingOrder: false,
        placedOrder: true,
        status: action.payload.status,
        message: action.payload.message,
        newOrder: action.payload.data
      };
    case ORDER.CREATE_FAILURE:
      return {
        ...state,
        placingOrder: false,
        placedOrder: false,
        status: action.payload.status,
        message: action.payload.message
      };
    case ORDER.CREATE_RESET:
      return {
        ...state,
        placingOrder: null,
        placedOrder: null,
        status: null,
        mmessage: "",
      }

    /* Fetch Order */
    case ORDER.FETCH_REQUEST:
      return {
        ...state,
        fetchingOrder: true
      };
    case ORDER.FETCH_SUCCESS:
      return {
        ...state,
        fetchingOrder: false,
        fetchedOrder: true,
        status: action.payload.status,
        message: action.payload.message,
        userOrders: action.payload.data
      };
    case ORDER.FETCH_FAILURE:
      return {
        ...state,
        fetchingOrder: false,
        fetchedOrder: true,
        status: action.payload.status,
        message: action.payload.message
      };

    /* Update Order */
    case ORDER.UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true
      };
    case ORDER.UPDATE_SUCCESS:
      const { _id } = action.payload.data;
      const orders = state.userOrders;
      const index = findIndex(orders, { _id });
      const userOrders = Object.assign([], orders, { [index]: action.payload.data });

      return {
        ...state,
        isUpdating: false,
        updatedOrder: true,
        status: action.payload.status,
        message: action.payload.message,
        userOrders,
      };
    case ORDER.UPDATE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        updatedOrder: true,
        status: action.payload.status,
        message: action.payload.message
      };

    default:
      return state;
  }
};
