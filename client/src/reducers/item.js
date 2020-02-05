import get from 'lodash/get';

import { ITEM } from '../constants/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  ui: {},
  idUI: {},
  editedUpload: {},
  pageCount: null,
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
        pageCount: action.payload.pageCount,
      }
    case ITEM.FETCH_ALL_FAILURE: 
      return {
        ...state, ui: { ...state.ui, isFetching: false},
      }

    case ITEM.ADD_REQUEST:
      return {
        ...state, ui: { ...state.ui, isAdding: true },
      }
    case ITEM.ADD_SUCCESS:
      return {
          ...state, 
          ui: { ...state.ui, isAdding: false },
          allIds: [action.payload._id, ...state.allIds],
          byId: { ...state.byId, [action.payload._id]: action.payload }
      }
    case ITEM.ADD_FAILURE:
      return {
        ...state, ui: { ...state.ui, isAdding: false },
      }

    case ITEM.REMOVE_REQUEST:
      return {
        ...state, ui: { ...state.ui, isRemoving: true },
      }
    case ITEM.REMOVE_SUCCESS:
      let allIds = [...state.allIds];
      let byId = { ...state.byId };

      const index = allIds.indexOf(action.payload._id);
      allIds.splice(index, 1);
      delete byId[action.payload._id];

      return {
          ...state, 
          ui: { ...state.ui, isRemoving: false },
          allIds,
          byId,
      }
    case ITEM.REMOVE_FAILURE:
      return {
        ...state, ui: { ...state.ui, isRemoving: false },
      }


    case ITEM.TOGGLE_EDIT_STATE:
      return {
        ...state,
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { isInEditingState: !get(state, `idUI.${action.payload._id}.isInEditingState`, false) } 
        },
      }

    case ITEM.EDIT_REQUEST:
      return {  ...state, ui: { ...state.ui, isEditing: true } };

    case ITEM.EDIT_SUCCESS:
      return {
        ...state, 
        byId: {
          ...state.byId, [action.payload._id]: action.payload,
        },
        ui: { ...state.ui, isEditing: false },
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { isInEditingState: !get(state, `idUI.${action.payload._id}.isInEditingState`, false) } 
        },
      };
      
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

    default:
      return state;
  }
}