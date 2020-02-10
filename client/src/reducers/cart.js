import { CART } from '../constants/actionTypes';
import * as reducers from '../helpers/commonReducer';

const initialState = {
  allIds: [],
  byId: {},
  ui: {},
  startIndex: 0,
  endIndex: 0,
  pageCount: 0,
  total: 0,
  idUI: {},
  numberOfCombinedOrder: 1,
  event: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case CART.FETCH_REQUEST:
      return {
        ...state, ui: { ...state.ui, isFetching: true },
      }
    case CART.FETCH_SUCCESS:
      return reducers.fetchData(state, action.payload);

    case CART.FETCH_FAILURE:
      return {
        ...state, ui: { ...state.ui, isFetching: false },
      }

    case CART.ADD_REQUEST:
      return {
        ...state, ui: { ...state.ui, isAdding: true },
      }
    case CART.ADD_SUCCESS:
      return { ...state, ui: { ...state.ui, isAdding: false } };

    case CART.ADD_FAILURE:
      return { ...state, ui: { ...state.ui, isAdding: false }, }


    case CART.REMOVE_REQUEST:
      return reducers.removeRequest(state, action.payload);

    case CART.REMOVE_SUCCESS:
      return reducers.removeData(state, action.payload);

    case CART.REMOVE_FAILURE:
      return reducers.removeFailure(state, action.payload);

    case CART.CHANGE_QUANTITY:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: {
            ...state.byId[action.payload._id],
            quantity: action.payload.quantity,
          }

        }
      }

    case CART.SELECT_EVENT:
      return {
        ...state,
        event: action.payload,
      };

    case CART.CHANGE_COMBINED_ORDER:
      return {
        ...state,
        numberOfCombinedOrder: action.payload,
      };

    case CART.FILL_REMAINING_DATA:
      return reducers.fillRemainingData(state, action.payload);

    default:
      return state;
  }
}