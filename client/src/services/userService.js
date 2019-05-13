import * as http from './http';
import { USER as user } from '../constants/apiRoutes';

export const getById = _id => http.get(user.BY_ID(_id));
export const login = data => http.post(user.LOGIN, data);