import * as http from './http';
import { USER as user } from '../constants/apiRoutes';

export const getById = _id => http.get(user.BY_ID(_id));
export const login = data => http.post(user.LOGIN, data);
export const register = data => http.post(user.REGISTER, data);
export const forgotPassword = data => http.post(user.FORGOT_PASSWORD, data);
export const resetPassword = data => http.post(user.RESET_PASSWORD, data);