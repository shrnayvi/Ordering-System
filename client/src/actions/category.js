import qs from 'query-string';
import pick from 'lodash/pick';

import { CATEGORY } from '../constants/actionTypes';
import { 
  getAll,
  addCategory,
} from '../apiCalls/category';

import notify from '../helpers/notification';
import config from '../constants/config';

const fetchCategory = data => {
  const allIds = [];
  const byId = {};

  data.categories.forEach(category => {
    allIds.push(category._id);
    byId[category._id] = category;
  });

  return { allIds, byId };

}

export const get = (args = { currentPage: 1 }) => async dispatch => {

  const query = pick(args, ['skip', 'limit'])
  dispatch({ type: CATEGORY.FETCH_REQUEST });

  const { data: response } = await getAll(qs.stringify(query));
  
  if(response.status === 200) {
    const data = fetchCategory(response.data, dispatch);
    const paging = response.data.paging;
    const payload = {
      ...data,
      currentPage: args.currentPage,
      pageCount: Math.ceil(paging.total / config.dataPerPage),
      total: paging.total,
      startIndex: paging.startIndex,
      endIndex: paging.endIndex,
    };

    dispatch({ type: CATEGORY.FETCH_ALL_SUCCESS, payload });
  } else {
    dispatch({ type: CATEGORY.FETCH_FAILURE, payload: response.message });
  }
}

export const add = (data, opts = {}) => async dispatch => {
  console.log(opts);
  dispatch({ type: CATEGORY.ADD_REQUEST});

  const { data: response } = await addCategory(data);
  
  if(response.status === 200) {
    const category = response.data;
    let _id = [];
    if(opts.currentPage && opts.currentPage === 1) {
      _id = [ category._id ];
    }

    dispatch({ type: CATEGORY.ADD_SUCCESS, payload: { category, _id } });
  } else {
    dispatch({ type: CATEGORY.ADD_FAILURE, payload: response.message });
    notify('error', response.message);
  }
}