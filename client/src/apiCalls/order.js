import * as http from '../request';
import { ORDER as order } from '../constants/apiRoutes';

export const placeOrder = data => http.post(order.BULKCREATE, data);
export const getUserOrder = userId => http.get(order.GET_ORDER(userId));
export const updateOrder = (_id, data) => http.put(order.UPDATE_ORDER(_id), data);
export const getAllOrder = () => http.get(order.GET_ALL_ORDER);
export const getFilteredOrders = filterData => http.get(order.FILTER_ORDER(filterData));