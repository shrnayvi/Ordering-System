import { CATEGORY } from '../constants/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  ui: {},
  hasUpdated: false,
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
    default:
      return state;
  }
}