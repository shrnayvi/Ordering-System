import { USER } from '../constants/actionTypes';
import get from 'lodash/get';
import config from '../constants/config';

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

    case USER.TOGGLE_EDIT_STATE:
      return {
        ...state,
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { isEditing: !get(state, `idUI.${action.payload._id}.isEditing`, false) } 
        },
      }

    case USER.FETCH_ALL_REQUEST:
      return { ...state, ui: { ...state.ui, isFetching: true } };
    case USER.FETCH_ALL_SUCCESS:
      return { 
        ...state,
        byId: { ...state.byId, ...action.payload.byId },
        allIds: action.payload.allIds,
        ui: { ...state.ui, isFetching: false },
        pageCount: action.payload.pageCount,
        total: action.payload.total,
        startIndex: action.payload.startIndex,
        endIndex: action.payload.endIndex,
      };
    case USER.FETCH_ALL_FAILURE:
      return { ...state, ui: { ...state.ui, isFetching: false } };

    case USER.EDIT_USER_REQUEST:
      return {  ...state, ui: { ...state.ui, isEditing: true } };

    case USER.EDIT_USER_SUCCESS:
      return {  
        ...state, 
        byId: {
          ...state.byId, [action.payload._id]: action.payload,
        },
        ui: { ...state.ui, isEditing: false },
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { isEditing: !get(state, `idUI.${action.payload._id}.isEditing`, false) } 
        },
      };
      
    case USER.EDIT_USER_FAILURE:
      return {  ...state, ui: { ...state.ui, isEditing: false } };

    case USER.REMOVE_REQUEST:
      return {  
        ...state, 
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { isDeleting: !get(state, `idUI.${action.payload._id}.isDeleting`, false) } 
        },
      };
    case USER.REMOVE_SUCCESS:
      let allIds = [...state.allIds];
      let byId = { ...state.byId };

      const index = allIds.indexOf(action.payload._id);
      allIds.splice(index, 1);
      delete byId[action.payload._id];

      return {  
        ...state, 
        allIds,
        byId,
        total: state.total - 1,
        pageCount: Math.ceil((state.total - 1) / config.dataPerPage),
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { isDeleting: !get(state, `idUI.${action.payload._id}.isDeleting`, false) } 
        },
      };
    case USER.REMOVE_FAILURE:
      return {  
        ...state,
        idUI: { 
          ...state.idUI, 
          [action.payload._id]: { isDeleting: !get(state, `idUI.${action.payload._id}.isDeleting`, false) } 
        },
      };

    case USER.FILL_REMAINING_DATA:
      return {
        ...state,
        allIds: [...state.allIds, ...action.payload.allIds],
        byId: {
          ...state.byId, ...action.payload.byId
        }
      }

    case USER.UPDATE_ENTITY:
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