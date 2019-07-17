import { ORDER } from '../constants/actionTypes';

const initialState = {
   status: null,
   message: '',
   userOrders: [],
}

export default (state = initialState, action) => {
   switch(action.type) {
      case ORDER.CREATE_REQUEST:
         return {
            ...state,
            placingOrder: true,
         }
      case ORDER.CREATE_SUCCESS:
         return {
            ...state,
            placingOrder: false,
            placedOrder: true,
            status: action.payload.status,
            message: action.payload.message,
            newOrder: action.payload.data,
         }
      case ORDER.CREATE_FAILURE:
         return {
            ...state,
            placingOrder: false,
            placedOrder: true,
            status: action.payload.status,
            message: action.payload.message
         };
      case ORDER.FETCH_REQUEST:
         return {
            ...state,
            fetchingOrder: true,
         }
      case ORDER.FETCH_SUCCESS:
         return {
            ...state,
            fetchingOrder: false,
            fetchedOrder: true,
            status: action.payload.status,
            message: action.payload.message,
            userOrders: action.payload.data,
         }
      case ORDER.FETCH_FAILURE:
         return {
            ...state,
            fetchingOrder: false,
            fetchedOrder: true,
            status: action.payload.status,
            message: action.payload.message
         };
      default: 
         return state;
   }
}