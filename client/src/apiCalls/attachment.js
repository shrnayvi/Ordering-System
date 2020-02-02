import * as http from '../helpers/request';
import { MEDIA as media} from '../constants/apiRoutes';

export const create = data => http.get(media.ADD(data));
export const getById = _id => http.get(media.GET_BY_ID(_id));