import * as http from './http';
import { USER as user } from '../constants/apiRoutes';

export const getAll = () => http.get(user.FETCH_ALL);
export const getById = _id => http.get(user.BY_ID(_id));
export const update = (_id, data) => http.put(user.EDIT(_id), data);
export const login = data => http.post(user.LOGIN, data, false);
export const loginWithGoogle = data => http.post(user.GOOGLE_OAUTH, data, false);
export const register = data => http.post(user.REGISTER, data, false);
export const forgotPassword = data => http.post(user.FORGOT_PASSWORD, data, false);
export const resetPassword = data => http.post(user.RESET_PASSWORD, data, false);
export const remove = _id => http.remove(user.DELETE(_id));