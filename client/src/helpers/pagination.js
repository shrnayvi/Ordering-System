import qs from 'query-string';
import config from '../constants/config';
import get from 'lodash/get';

export const getPagingArgs = location => {
  let query = qs.parse(location.search);
  let page = get(query, 'page', 1);

  return { 
    currentPage: page,
    skip: (page - 1) *  config.dataPerPage, 
    limit: config.dataPerPage 
  };
}

export const getPage = location => {
  let query = qs.parse(location.search);
  let page = get(query, 'page', 1);

  return page;
}