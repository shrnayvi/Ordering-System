import * as http from '../helpers/request';
import { CART as cart } from '../constants/apiRoutes';

export const getCart = _ => http.get(cart.GET);
export const addToCart = data => http.post(cart.ADD, data);
export const removeFromCart = _id => http.remove(cart.REMOVE(_id));