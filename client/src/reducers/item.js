import get from 'lodash/get';

import { ITEM } from '../constants/actionTypes';
import config from '../constants/config';

const initialState = {
  allIds: [],
  byId: {},
  ui: {},
  idUI: {},
  editedUpload: {},
  pageCount: 0,
  currentPage: 1,
  total: null,
  startIndex: 0,
  endIndex: 0,
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
        currentPage: +action.payload.currentPage,
        total: action.payload.total,
        startIndex: action.payload.startIndex,
        endIndex: action.payload.endIndex,
      }
    case ITEM.FETCH_ALL_FAILURE: 
      return {
        ...state, ui: { ...state.ui, isFetching: false},
      }


    case ITEM.FETCH_SINGLE_SUCCESS: 
      return {
        ...state, 
        ui: { ...state.ui, isFetching: false},
        byId: { ...state.byId, [action.payload._id]: action.payload },
      }
    case ITEM.FETCH_SINGLE_FAILURE: 
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
          allIds: [...action.payload._id, ...state.allIds],
          byId: { ...state.byId, [action.payload.item._id]: action.payload.item },
          total: state.total + 1,
          pageCount: Math.ceil((state.total + 1) / config.dataPerPage),
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
          total: state.total - 1,
          pageCount: Math.ceil((state.total - 1) / config.dataPerPage),
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
          [action.payload._id]: { 
            isInEditingState: !get(state, `idUI.${action.payload._id}.isInEditingState`, false) 
          } 
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


    case ITEM.REMOVE_LAST_ID:
      const newIds = [...state.allIds];
      newIds.splice(newIds.length - 1, 1);
      return {
        ...state, 
        allIds: newIds,
      }

    case ITEM.FILL_REMAINING_DATA:
      // console.log(action.payload.allIds, 'reducer');
      return {
        ...state,
        allIds: [...state.allIds, ...action.payload.allIds],
        byId: { ...state.byId, ...action.payload.byId },
      }


    case ITEM.UPDATE_ENTITY:
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