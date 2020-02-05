import { ITEM, MEDIA, CATEGORY } from '../constants/actionTypes';
import { 
  getAll as getItems,
  addItem,
  removeItem,
  editItem,
} from '../apiCalls/item';

import { create as createMedia } from '../apiCalls/attachment';

import notify from '../helpers/notification';

export const getAll = (query = null) => async dispatch => {
  dispatch({ type: ITEM.FETCH_ALL_REQUEST });

  const { data: response } = await getItems(query);
  
  if(response.status === 200) {
    const allIds = [];
    const byId = {};

    response.data.items.forEach(item => {
      allIds.push(item._id);
      const media = item.avatar;
      if(media) {
        item.avatar = media._id; 
        dispatch({ type: MEDIA.UPDATE_MEDIA, payload: media });
      }
      const category = item.category;
      item.category = category._id;
      dispatch({ type: CATEGORY.UPDATE_CATEGORY_STORE, payload: category });
      byId[item._id] = item;
    });

    dispatch({ type: ITEM.FETCH_ALL_SUCCESS, payload: { allIds, byId, pageCount: response.data.pageCount } });
  } else {
    dispatch({ type: ITEM.FETCH_ALL_FAILURE, payload: response.message });
  }
}

export const add = data => async dispatch => {
  dispatch({ type: ITEM.ADD_REQUEST });

  const { data: response } = await addItem(data);
  
  if(response.status === 200) {
    dispatch({ type: ITEM.ADD_SUCCESS, payload: response.data });
    dispatch({ type: MEDIA.CLEAR_UPLOADED_MEDIA });
  } else {
    dispatch({ type: ITEM.ADD_FAILURE, payload: response.message });
    notify('error', response.message);
  }
}

export const edit = (_id, data) => async dispatch => {
  dispatch({ type: ITEM.EDIT_REQUEST });

  const { data: response } = await editItem(_id, data);
  
  if(response.status === 200) {
    dispatch({ type: ITEM.EDIT_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: ITEM.EDIT_FAILURE, payload: response.message });
  }
}

export const remove = _id => async dispatch => {
  dispatch({ type: ITEM.REMOVE_REQUEST });

  const { data: response } = await removeItem(_id);
  
  if(response.status === 200) {
    dispatch({ type: ITEM.REMOVE_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: ITEM.REMOVE_FAILURE, payload: response.message });
  }
}

export const toggleEditState = _id => async dispatch => {
  dispatch({ type: ITEM.TOGGLE_EDIT_STATE, payload: { _id } });
}

export const uploadEditedItemMedia = (_id, file) => async dispatch => {
  dispatch({ type: ITEM.EDIT_UPLOADING, payload: { _id } });

  const { data: response } = await createMedia(file);

  if (response.status === 200) {
    dispatch({ type: MEDIA.UPDATE_MEDIA, payload: response.data });
    dispatch({ type: ITEM.SAVE_EDITED_UPLOAD, payload: { _id, media: response.data } });
  } else {
    dispatch({ type: MEDIA.ADD_FAILURE, payload: response.message });
    notify('error', response.message);
  }
};