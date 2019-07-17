import * as http from './http';
import { ORDER as order } from '../constants/apiRoutes';

export const placeOrder = data => http.post(order.CREATE, data);
export const getUserOrder = userId => http.get(order.GET_ORDER(userId));