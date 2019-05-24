import { ITEM } from '../constants/actionTypes';

const initialState = {
   itemData: [],
   singleItem: {},
   status: null,
   message: null,
   fetchingItems: false,
   fetchItemsFailure: false,
}

export default (state = initialState, action) => {
   switch(action.type) {
      case ITEM.FETCH_ALL_REQUEST:
         return {
            ...state,
            fetchingItems: true,
            fetchItemFailure: false,
         }
      case ITEM.FETCH_ALL_SUCCESS:
         return {
            ...state,
            fetchingItems: false,
            fetchItemFailure: false,
            itemData: action.payload,
         }
      case ITEM.FETCH_ALL_FAILURE:
         return {
            ...state,
            fetchingItems: false,
            fetchItemFailure: true,
            status: action.payload.status,
            message: action.payload.message
         };
      case ITEM.FETCH_SINGLE_REQUEST:
         return {
            ...state,
            fetchingItems: true,
            fetchItemFailure: true,
            status: null,
            message: null
         };
      case ITEM.FETCH_SINGLE_SUCCESS:
         return {
            ...state,
            fetchingItems: false,
            fetchComplete: true,
            status: null,
            message: action.payload.message,
            singleItem: action.payload.data,
         };
      case ITEM.FETCH_SINGLE_FAILURE:
         return {
            ...state,
            fetchingItems: false,
            fetchComplete: true,
            status: action.payload.status,
            message: action.payload.message,
            singleItem: {},
         };
      default: 
         return state;
   }
}