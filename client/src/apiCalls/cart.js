import * as http from '../helpers/request';
import { CART as cart } from '../constants/apiRoutes';

export const getCart = query => http.get(cart.GET(query));
export const addToCart = data => http.post(cart.ADD, data);
export const removeFromCart = _id => http.remove(cart.REMOVE(_id));