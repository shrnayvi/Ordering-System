import get from 'lodash/get';

import { ITEM } from '../constants/actionTypes';
import * as reducers from '../helpers/commonReducer';

const initialState = {
  allIds: [],
  byId: {},
  ui: {},
  idUI: {},
  editedUpload: {},
  pageCount: 0,
  currentPage: 1,
  total: 0,
  startIndex: 0,
  endIndex: 0,
};

export default (state = initialState, action) => {
  switch(action.type) {
    /* Fetch section */
    case ITEM.FETCH_ALL_REQUEST: 
      return { ...state, ui: { ...state.ui, isFetching: true }, }

    case ITEM.FETCH_ALL_SUCCESS: 
      return reducers.fetchData(state, action.payload);

    case ITEM.FETCH_ALL_FAILURE: 
      return { ...state, ui: { ...state.ui, isFetching: false}, }


    /* Single Item */
    case ITEM.FETCH_SINGLE_SUCCESS: 
      return {
        ...state, 
        ui: { ...state.ui, isFetching: false},
        byId: { ...state.byId, [action.payload._id]: action.payload },
      }
    case ITEM.FETCH_SINGLE_FAILURE: 
      return { ...state, ui: { ...state.ui, isFetching: false}, }


    /* Add Section */
    case ITEM.ADD_REQUEST:
      return { ...state, ui: { ...state.ui, isAdding: true } };

    case ITEM.ADD_SUCCESS:
      return reducers.addData(state, action.payload);

    case ITEM.ADD_FAILURE:
      return { ...state, ui: { ...state.ui, isAdding: false }, }

    /* Remove Section */
    case ITEM.REMOVE_REQUEST:
      return {
        ...state, ui: { ...state.ui, isRemoving: true },
      }
    case ITEM.REMOVE_SUCCESS:
      return reducers.removeData(state, action.payload);

    case ITEM.REMOVE_FAILURE:
      return { ...state, ui: { ...state.ui, isRemoving: false }, }


    /* Toggle Edit */
    case ITEM.TOGGLE_EDIT_STATE:
      return reducers.toggleEditState(state, action.payload);


    /* Edit Section */
    case ITEM.EDIT_REQUEST:
      return {  ...state, ui: { ...state.ui, isEditing: true } };

    case ITEM.EDIT_SUCCESS:
      return reducers.editSuccess(state, action.payload);
      
    case ITEM.EDIT_FAILURE:
      return {  ...state, ui: { ...state.ui, isEditing: false } };
    
    case ITEM.EDIT_UPLOADING:
      return {
        ...state, 
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { 
            isInEditingState: get(state, `idUI.${action.payload._id}.isInEditingState`, false),
            isUploading: !get(state, `idUI.${action.payload._id}.isUploading`, false) 
          } 
        },
      };

    case ITEM.SAVE_EDITED_UPLOAD:
      return {
        ...state,
        editedUpload: {
          ...state.editedUpload, [action.payload._id]: action.payload.media,
        },
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { 
            isInEditingState: get(state, `idUI.${action.payload._id}.isInEditingState`, false),
            isUploading: !get(state, `idUI.${action.payload._id}.isUploading`, false) 
          } 
        },
      }


    /* Remove last id from state after adding new element if its first page */
    case ITEM.REMOVE_LAST_ID:
      return reducers.removeLastId(state);

    case ITEM.FILL_REMAINING_DATA:
      return reducers.fillRemainingData(state, action.payload);

    case ITEM.UPDATE_ENTITY:
      return reducers.updateEntity(state, action.payload);

    default:
      return state;
  }
}