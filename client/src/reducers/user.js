import { USER } from '../constants/actionTypes';
import * as reducers from '../helpers/commonReducer';

const initialState = {
  byId: {},
  allIds: [],
  idUI: {},
  ui: {},
  pageCount: 0,
  startIndex: 0,
  endIndex: 0,
  total: 0,
}

export default (state = initialState, action) => {
  switch(action.type) {
    /* add section */
    case USER.ADD_USER_REQUEST:
      return { ...state, ui: { ...state.ui, isAdding: true } };
    case USER.ADD_USER_SUCCESS:
      return { 
        ...state,
        byId: { ...state.byId, [action.payload._id]: action.payload },
        allIds: state.allIds,
        ui: { ...state.ui, isAdding: false } 
      };
    case USER.ADD_USER_FAILURE:
      return { 
        ...state,
        ui: { ...state.ui, isAdding: false } 
      };

    /* edit toggle section */
    case USER.TOGGLE_EDIT_STATE:
      return reducers.toggleEditState(state, action.payload);

    /* fetch section */
    case USER.FETCH_ALL_REQUEST:
      return { ...state, ui: { ...state.ui, isFetching: true } };
    case USER.FETCH_ALL_SUCCESS:
      return reducers.fetchData(state, action.payload);

    case USER.FETCH_ALL_FAILURE:
      return { ...state, ui: { ...state.ui, isFetching: false } };


    /* Edit section */
    case USER.EDIT_USER_REQUEST:
      return reducers.editRequest(state, action.payload);

    case USER.EDIT_USER_SUCCESS:
      return reducers.editSuccess(state, action.payload);
      
    case USER.EDIT_USER_FAILURE:
      return reducers.editFailure(state, action.payload);

    /* Remove section */
    case USER.REMOVE_REQUEST:
      return reducers.removeRequest(state, action.payload);

    case USER.REMOVE_SUCCESS:
      return reducers.removeData(state, action.payload);

    case USER.REMOVE_FAILURE:
      return reducers.removeFailure(state, action.payload);

    
    /* Fill Remaining Users after removing */
    case USER.FILL_REMAINING_DATA:
      return reducers.fillRemainingData(state, action.payload);

    /* Update user byId */
    case USER.UPDATE_ENTITY:
      return reducers.updateEntity(state, action.payload);

    default:
      return state;
  }
}