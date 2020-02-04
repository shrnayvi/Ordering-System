import * as http from '../helpers/request';
import { CATEGORY as category } from '../constants/apiRoutes';

export const getBySlug = slug => http.get(category.GET_BY_SLUG(slug));
export const getAll = (query) => http.get(category.GET_ALL_CATEGORY(query));
export const addCategory = data => http.post(category.ADD, data);
export const removeCategory = _id => http.remove(category.REMOVE(_id));
export const editCategory = (_id, data) => http.put(category.EDIT(_id), data);