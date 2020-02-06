import qs from 'query-string';
import pick from 'lodash/pick';

import { ITEM, MEDIA, CATEGORY } from '../constants/actionTypes';
import { 
  getAll as getItems,
  addItem,
  removeItem,
  editItem,
  getBySlug,
} from '../apiCalls/item';

import { create as createMedia } from '../apiCalls/attachment';
import notify from '../helpers/notification';
import config from '../constants/config';

const fetchItems = (data, dispatch) => {
  const allIds = [];
  const byId = {};

  data.items.forEach(item => {
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

  return {
    allIds, 
    byId, 
  }

}

export const getAll = (args = { currentPage: 1 }) => async dispatch => {
  dispatch({ type: ITEM.FETCH_ALL_REQUEST });

  const query = pick(args, ['skip', 'limit'])
  const { data: response } = await getItems(qs.stringify(query));
  
  if(response.status === 200) {
    let data = fetchItems(response.data, dispatch);
    let paging = response.data.paging;
    data = {
      ...data,
      currentPage: args.currentPage,
      pageCount: Math.ceil(paging.total / config.dataPerPage),
      total: paging.total,
      startIndex: paging.startIndex,
      endIndex: paging.endIndex,
    }

    dispatch({ 
      type: ITEM.FETCH_ALL_SUCCESS, 
      payload: data,
    });
  } else {
    dispatch({ type: ITEM.FETCH_ALL_FAILURE, payload: response.message });
  }
}

export const getSingle = _id => async dispatch => {

  const { data: response } = await getBySlug(_id);
  
  if(response.status === 200) {
    const item = response.data;
    const media = item.avatar;
    if(media) {
      item.avatar = media._id; 
      dispatch({ type: MEDIA.UPDATE_MEDIA, payload: media });
    }

    const category = item.category;
    if(category) {
      item.category = category._id;
      dispatch({ type: CATEGORY.UPDATE_CATEGORY_STORE, payload: category });
    }

    dispatch({ type: ITEM.FETCH_SINGLE_SUCCESS, payload: item });
  } else {
    dispatch({ type: ITEM.FETCH_SINGLE_FAILURE, payload: response.message });
  }
}

export const add = (data, opts = {}) => async dispatch => {
  dispatch({ type: ITEM.ADD_REQUEST });

  const { data: response } = await addItem(data);
  
  if(response.status === 200) {
    const item = response.data;
    let _id = [];
    if(opts.currentPage && opts.currentPage === 1) {
      _id = [ item._id ];
    }

    dispatch({ type: ITEM.ADD_SUCCESS, payload: { item, _id } });
    dispatch({ type: MEDIA.CLEAR_UPLOADED_MEDIA });
  } else {
    dispatch({ type: ITEM.ADD_FAILURE, payload: response.message });
    notify('error', response.message);
  }
}

export const removeLastId = _ => ({ type: ITEM.REMOVE_LAST_ID });

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

export const fillRemainingDataWhenRemoving = args => async dispatch => {
  const { data: response } = await getItems(qs.stringify(args));
  
  if(response.status === 200) {
    let data = fetchItems(response.data, dispatch);

    dispatch({ 
      type: ITEM.FILL_REMAINING_DATA, 
      payload: data,
    });
  }
};
