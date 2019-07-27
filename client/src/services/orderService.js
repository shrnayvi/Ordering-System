import * as http from './http';
import { ORDER as order } from '../constants/apiRoutes';

export const placeOrder = data => http.post(order.BULKCREATE, data);
export const getUserOrder = userId => http.get(order.GET_ORDER(userId));
export const updateOrder = (_id, data) => http.put(order.UPDATE_ORDER(_id), data);