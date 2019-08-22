import omit from 'lodash/omit';
import { ITEM } from '../constants/actionTypes';
import * as itemService from '../services/itemService';

/**
 * Fetch all the items
 */
export const fetchItems = (page = null) => async (dispatch) => {
  console.log(page)
  dispatch({ type: ITEM.FETCH_ALL_REQUEST });

  try {
    const query = page ? `page=${page}`: null;
    let { data: response } = await itemService.getAll(query);
    if (response.status === 200) {
      dispatch({ type: ITEM.FETCH_ALL_SUCCESS, payload: response.data })
    } else {
      const { status, message } = response
      dispatch({ type: ITEM.FETCH_ALL_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: ITEM.FETCH_ALL_FAILURE, payload: { status: 500, message: e.message } });
  }
}


/**
 * Fetch item by slug
 */
export const fetchBySlug = slug => async dispatch => {
  dispatch({ type: ITEM.FETCH_SINGLE_REQUEST });

  try {
    let { data: response } = await itemService.getBySlug(slug);
    const { status, message } = response;
    if (response.status === 200) {
      dispatch({ type: ITEM.FETCH_SINGLE_SUCCESS, payload: { message, data: response.data } });
    } else {
      dispatch({ type: ITEM.FETCH_SINGLE_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: ITEM.FETCH_SINGLE_FAILURE, payload: { status: 500, message: e.message } });
  }
}

/**
 * Fetch items by certain categories 
 * @param {String} category Category name
 */
export const fetchByCategory = category => async dispatch => {
  dispatch({ type: ITEM.FETCH_CATEGORY_REQUEST });

  try {
    let { data: response } = await itemService.getByCategory(category);
    if (response.status === 200) {
      dispatch({ type: ITEM.FETCH_CATEGORY_SUCCESS, payload: response.data })
    } else {
      const { status, message } = response
      dispatch({ type: ITEM.FETCH_CATEGORY_FAILURE, payload: { status, message } });
    }
  } catch (e) {
    dispatch({ type: ITEM.FETCH_CATEGORY_FAILURE, payload: { status: 500, message: e.message } });
  }
}

export const removeItem = _id => async dispatch => {
  dispatch({ type: ITEM.REMOVE_REQUEST });

  try {
    let { data: response } = await itemService.removeItem(_id);
    if(response.status === 200) {
      dispatch({ type: ITEM.REMOVE_SUCCESS, payload: { _id: response.data._id }});
    } else {
      dispatch({ type: ITEM.REMOVE_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: ITEM.REMOVE_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const addItem = data => async dispatch => {
  dispatch({ type: ITEM.ADD_REQUEST });

  try {
    let { data: response } = await itemService.addItem(data);
    if(response.status === 200) {
      dispatch({ type: ITEM.ADD_SUCCESS, payload: response });
      // history.push(routes.ALL_CATEGORIES);
    } else {
      dispatch({ type: ITEM.ADD_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: ITEM.ADD_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const updateItem = (_id, data) => async dispatch => {
  dispatch({ type: ITEM.UPDATE_REQUEST });

  try {
    let { data: response } = await itemService.editItem(_id, data);
    if(response.status === 200) {
      dispatch({ type: ITEM.UPDATE_SUCCESS, payload: response });
    } else {
      dispatch({ type: ITEM.UPDATE_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: ITEM.UPDATE_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const resetStatus = () => async dispatch => {
  dispatch({ type: ITEM.RESET_STATUS });
}

export const handleInputChange = data => async dispatch => {
  data = omit(data, ['slug']);
  dispatch({ type: ITEM.HANDLE_INPUT_CHANGE, payload: data });
}