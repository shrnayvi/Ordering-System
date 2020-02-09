import * as http from '../helpers/request';
import { ORDER as order } from '../constants/apiRoutes';

export const createOrder = data => http.post(order.ADD, data);
export const getUserOrder = userId => http.get(order.GET_ORDER(userId));
export const editOrder = (_id, data) => http.put(order.UPDATE_ORDER(_id), data);
export const getAll = query => http.get(order.GET_ALL_ORDER(query));