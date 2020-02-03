import * as http from '../helpers/request';
import { MEDIA as media} from '../constants/apiRoutes';

export const create = data => http.post(media.ADD, data, false, { 'Content-Type': 'multipart/form-data' });
export const getById = _id => http.get(media.GET_BY_ID(_id));