import { ORDER_DETAIL } from '../constants/actionTypes';
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
    case ORDER_DETAIL.FETCH_REQUEST:
      return {
        ...state, ui: { ...state.ui, isFetching: true },
      }
    case ORDER_DETAIL.FETCH_SUCCESS:
      return reducers.fetchData(state, action.payload);

    case ORDER_DETAIL.FETCH_FAILURE:
      return {
        ...state, ui: { ...state.ui, isFetching: false },
      }


    default:
      return state;
  }
}