import * as http from '../helpers/request';
import { EVENT as event } from '../constants/apiRoutes';

export const getBySlug = slug => http.get(event.GET_BY_SLUG(slug));
export const getAll = (query) => http.get(event.GET_ALL_EVENT(query));
export const addEvent = data => http.post(event.ADD, data);
export const removeEvent = _id => http.remove(event.REMOVE(_id));
export const editEvent = (_id, data) => http.put(event.EDIT(_id), data);