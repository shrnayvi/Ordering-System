import config from '../constants/config';
import { CATEGORY } from '../constants/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  ui: {},
  startIndex: 0,
  endIndex: 0,
  pageCount: 0,
  total: 0,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case CATEGORY.FETCH_REQUEST:
      return {
        ...state, ui: { ...state.ui, isFetching: true },
      }
    case CATEGORY.FETCH_ALL_SUCCESS:
      return {
        ...state, ui: { ...state.ui, isFetching: false },
        allIds: action.payload.allIds,
        byId: action.payload.byId,
        startIndex: action.payload.startIndex,
        endIndex: action.payload.endIndex,
        total: action.payload.total,
        currentPage: +action.payload.currentPage,
      }
    case CATEGORY.FETCH_FAILURE:
      return {
        ...state, ui: { ...state.ui, isFetching: false },
      }

    case CATEGORY.UPDATE_CATEGORY_STORE:
      return {
        ...state,
        byId: { ...state.byId, [action.payload._id]: action.payload }
      }



    case CATEGORY.ADD_REQUEST:
      return {
        ...state, ui: { ...state.ui, isAdding: true },
      }
    case CATEGORY.ADD_SUCCESS:
      return {
          ...state, 
          ui: { ...state.ui, isAdding: false },
          allIds: [...action.payload._id, ...state.allIds],
          byId: { ...state.byId, [action.payload.category._id]: action.payload.category },
          total: state.total + 1,
          pageCount: Math.ceil((state.total + 1) / config.dataPerPage),
      }
    case CATEGORY.ADD_FAILURE:
      return {
        ...state, ui: { ...state.ui, isAdding: false },
      }


    default:
      return state;
  }
}