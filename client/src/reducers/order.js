import { ORDER } from '../constants/actionTypes';
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
    case ORDER.FETCH_REQUEST:
      return {
        ...state, ui: { ...state.ui, isFetching: true },
      }
    case ORDER.FETCH_ALL_SUCCESS:
      return reducers.fetchData(state, action.payload);

    case ORDER.FETCH_FAILURE:
      return {
        ...state, ui: { ...state.ui, isFetching: false },
      }


    case ORDER.UPDATE_ORDER_STORE:
      return {
        ...state,
        byId: { ...state.byId, [action.payload._id]: action.payload }
      }

    /* Place Order */
    case ORDER.CREATE_REQUEST: 
      return { ...state, ui: { isAdding: true } };

    case ORDER.CREATE_SUCCESS: 
      return { ...state, ui: { isAdding: false } };

    case ORDER.CREATE_FAILURE: 
      return { ...state, ui: { isAdding: false } };


    /* Edit Section */
    case ORDER.EDIT_REQUEST:
      return reducers.editRequest(state, action.payload);
      
    case ORDER.EDIT_SUCCESS:
      return reducers.editSuccess(state, action.payload);

    case ORDER.EDIT_FAILURE:
      return reducers.editFailure(state, action.payload);

    case ORDER.TOGGLE_EDIT_STATE:
      return reducers.toggleEditState(state, action.payload);

    case ORDER.UPDATE_ENTITY:
      return {
        ...state,
        byId: {
          ...state.byId, [action.payload._id]: action.payload,
        }
      }

    default:
      return state;
  }
}