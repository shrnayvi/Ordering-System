import * as http from './http';
import { ITEM as item } from '../constants/apiRoutes';

export const getAll = () => http.get(item.GET_ALL, false);
export const getBySlug = (slug) => http.get(item.GET_BY_SLUG(slug), false);