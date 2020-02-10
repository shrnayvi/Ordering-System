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
      // return reducers.addData(state, action.payload);
      return { ...state, ui: { ...state.ui, isAdding: false } };

    case CART.ADD_FAILURE:
      return { ...state, ui: { ...state.ui, isAdding: false }, }


    case CART.TOGGLE_EDIT_STATE:
      return reducers.toggleEditState(state, action.payload);


    case CART.REMOVE_REQUEST:
      return reducers.removeRequest(state, action.payload);

    case CART.REMOVE_SUCCESS:
      return reducers.removeData(state, action.payload);

    case CART.REMOVE_FAILURE:
      return reducers.removeFailure(state, action.payload);


    case CART.FILL_REMAINING_DATA:
      return reducers.fillRemainingData(state, action.payload);

    default:
      return state;
  }
}