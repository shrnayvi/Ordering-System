import { EVENT } from '../constants/actionTypes';
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
    case EVENT.FETCH_REQUEST:
      return {
        ...state, ui: { ...state.ui, isFetching: true },
      }
    case EVENT.FETCH_ALL_SUCCESS:
      return reducers.fetchData(state, action.payload);

    case EVENT.FETCH_FAILURE:
      return {
        ...state, ui: { ...state.ui, isFetching: false },
      }


    case EVENT.UPDATE_EVENT_STORE:
      return {
        ...state,
        byId: { ...state.byId, [action.payload._id]: action.payload }
      }

    case EVENT.ADD_REQUEST:
      return {
        ...state, ui: { ...state.ui, isAdding: true },
      }
    case EVENT.ADD_SUCCESS:
      return reducers.addData(state, action.payload);

    case EVENT.ADD_FAILURE:
      return {
        ...state, ui: { ...state.ui, isAdding: false },
      }


    case EVENT.EDIT_REQUEST:
      return reducers.editRequest(state, action.payload);
      
    case EVENT.EDIT_SUCCESS:
      return reducers.editSuccess(state, action.payload);

    case EVENT.EDIT_FAILURE:
      return reducers.editFailure(state, action.payload);

    case EVENT.TOGGLE_EDIT_STATE:
      return reducers.toggleEditState(state, action.payload);


    case EVENT.REMOVE_REQUEST:
      return reducers.removeRequest(state, action.payload);

    case EVENT.REMOVE_SUCCESS:
      return reducers.removeData(state, action.payload);

    case EVENT.REMOVE_FAILURE:
      return reducers.removeFailure(state, action.payload);


    case EVENT.REMOVE_LAST_ID:
      return reducers.removeLastId(state);

    case EVENT.FILL_REMAINING_DATA:
      return reducers.fillRemainingData(state, action.payload);

    case EVENT.UPDATE_ENTITY:
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