import * as http from '../helpers/request';
import { ITEM as item } from '../constants/apiRoutes';

export const getAll = query => http.get(item.GET_ALL(query), false);
export const getBySlug = slug => http.get(item.GET_BY_SLUG(slug), false);
export const getByCategory = category => http.get(item.GET_BY_CATEGORY(category), false);
export const addItem = data => http.post(item.ADD, data);
export const editItem = (_id, data) => http.put(item.EDIT(_id), data);
export const removeItem = _id => http.remove(item.REMOVE(_id));