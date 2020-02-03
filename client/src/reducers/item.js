import { ITEM } from '../constants/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  ui: {},
  idUI: {},
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ITEM.FETCH_ALL_REQUEST: 
      return {
        ...state, ui: { ...state.ui, isFetching: true },
      }
    case ITEM.FETCH_ALL_SUCCESS: 
      return {
        ...state, ui: { ...state.ui, isFetching: false},
        allIds: action.payload.allIds,
        byId: { ...state.byId, ...action.payload.byId },
      }
    case ITEM.FETCH_ALL_FAILURE: 
      return {
        ...state, ui: { ...state.ui, isFetching: false},
      }
    default:
      return state;
  }
}