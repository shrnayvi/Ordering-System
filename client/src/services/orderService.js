import * as http from './http';
import { ORDER as order, CART as cart } from '../constants/apiRoutes';

export const placeOrder = data => http.post(order.CREATE, data);
export const getUserOrder = userId => http.get(order.GET_ORDER(userId));
export const updateOrder = (_id, data) => http.put(order.UPDATE_ORDER(_id), data);
export const addCart = item => http.post(cart.ADD, { item });