import get from 'lodash/get';
import config from '../constants/config';

export const fetchData = (state, payload) => ({
  ...state, ui: { ...state.ui, isFetching: false },
  allIds: payload.allIds,
  byId: payload.byId,
  startIndex: payload.startIndex,
  endIndex: payload.endIndex,
  total: payload.total,
  currentPage: +payload.currentPage,
  pageCount: payload.pageCount,
});

export const addData = (state, payload) => ({
  ...state, 
  ui: { ...state.ui, isAdding: false },
  allIds: [...payload._id, ...state.allIds],
  byId: { ...state.byId, [payload.data._id]: payload.data },
  total: state.total + 1,
  pageCount: Math.ceil((state.total + 1) / config.dataPerPage),

})

export const removeData = (state, payload) => {
  let allIds = [...state.allIds];
  let byId = { ...state.byId };

  const index = allIds.indexOf(payload._id);
  allIds.splice(index, 1);
  delete byId[payload._id];

  return {
      ...state, 
      ui: { ...state.ui, isRemoving: false },
      allIds,
      byId,
      total: state.total - 1,
      pageCount: Math.ceil((state.total - 1) / config.dataPerPage),
      idUI: {
        ...state.idUI,
        [payload._id]: {
          ...state.idUI[payload._id], isRemoving: false,
        }
      }
  }
}

export const removeLastId = state => {
  const newIds = [...state.allIds];
  newIds.splice(newIds.length - 1, 1);
  return {
    ...state, 
    allIds: newIds,
  }
}

export const fillRemainingData = (state, payload) => ({
  ...state,
  allIds: [...state.allIds, ...payload.allIds],
  byId: { ...state.byId, ...payload.byId },
});

export const editRequest = (state, payload) => ({
  ...state, 
  idUI: { 
    ...state.idUI,
    [payload]: { ...state[payload], isEditing: true },
  },
})

export const removeFailure = (state, payload) => ({
  ...state,
  idUI: {
    ...state.idUI,
    [payload._id]: {
      ...state.idUI[payload._id], isRemoving: false,
    }
  }
});

export const editFailure = (state, payload) => ({
  ...state, ui: { ...state.ui, isAdding: false },
  idUI: { 
    ...state.idUI,
    [payload._id]: { ...state[payload._id], isEditing: false },
  },
});

export const editSuccess = (state, payload) => ({
  ...state, 
  byId: { ...state.byId, [payload._id]: payload },
  idUI: { 
    ...state.idUI,
    [payload._id]: { ...state[payload._id], isEditing: false },
  },
});

export const toggleEditState = (state, payload) => ({
  ...state,
  idUI: { 
    ...state.idUI, 
    [payload._id]: { 
      isInEditingState: !get(state, `idUI.${payload._id}.isInEditingState`, false) 
    } 
  }
});

export const removeRequest = (state, payload) => ({
  ...state, 
  idUI: {
    ...state.idUI,
    [payload._id]: {
      ...state.idUI[payload._id], isRemoving: true,
    }
  }
});