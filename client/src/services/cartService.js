import * as http from './http';
import { CART as cart } from '../constants/apiRoutes';

export const getCart = () => http.get(cart.GET);
export const addToCart = item => http.post(cart.ADD, { item });
export const removeFromCart = _id => http.remove(cart.REMOVE(_id));