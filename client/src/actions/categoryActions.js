import omit from 'lodash/omit';
import { CATEGORY } from "../constants/actionTypes";
import * as categoryService from "../services/categoryService";
import routes from '../constants/routes';
import history from '../helpers/history';


export const getBySlug = slug => async dispatch => {
  dispatch({ type: CATEGORY.FETCH_REQUEST });

  try {
    let { data: response } = await categoryService.getBySlug(slug);
    if(response.status === 200) {
      dispatch({ type: CATEGORY.FETCH_SINGLE_SUCCESS, payload: response });
    } else {
      dispatch({ type: CATEGORY.FETCH_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: CATEGORY.FETCH_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const fetchAllCategory = () => async dispatch => {
  dispatch({ type: CATEGORY.FETCH_REQUEST });

  try {
    let { data: response } = await categoryService.getCategories();
    if(response.status === 200) {
      dispatch({ type: CATEGORY.FETCH_ALL_SUCCESS, payload: response });
    } else {
      dispatch({ type: CATEGORY.FETCH_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: CATEGORY.FETCH_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const removeCategory = _id => async dispatch => {
  dispatch({ type: CATEGORY.REMOVE_REQUEST });

  try {
    let { data: response } = await categoryService.removeCategory(_id);
    if(response.status === 200) {
      dispatch({ type: CATEGORY.REMOVE_SUCCESS, payload: { _id: response.data._id }});
    } else {
      dispatch({ type: CATEGORY.REMOVE_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: CATEGORY.REMOVE_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const addCategory = data => async dispatch => {
  dispatch({ type: CATEGORY.ADD_REQUEST });

  try {
    let { data: response } = await categoryService.addCategory(data);
    if(response.status === 200) {
      dispatch({ type: CATEGORY.ADD_SUCCESS, payload: response });
      history.push(routes.ALL_CATEGORIES);
    } else {
      dispatch({ type: CATEGORY.ADD_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: CATEGORY.ADD_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const updateCategory = (_id, data) => async dispatch => {
  dispatch({ type: CATEGORY.UPDATE_REQUEST });

  try {
    let { data: response } = await categoryService.editCategory(_id, data);
    if(response.status === 200) {
      dispatch({ type: CATEGORY.UPDATE_SUCCESS, payload: response });
    } else {
      dispatch({ type: CATEGORY.UPDATE_FAILURE, payload: { status: response.status, message: response.message } });
    }
  } catch(e) {
    dispatch({ type: CATEGORY.UPDATE_FAILURE, payload: { status: 500, message: e.message } })
  }
}

export const resetStatus = () => async dispatch => {
  dispatch({ type: CATEGORY.RESET_STATUS });
}

export const handleInputChange = data => async dispatch => {
  data = omit(data, ['slug']);
  dispatch({ type: CATEGORY.HANDLE_INPUT_CHANGE, payload: data });
}