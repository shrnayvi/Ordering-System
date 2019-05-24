import * as http from './http';
import { ORDER as order } from '../constants/apiRoutes';

export const placeOrder = () => http.get(order.CREATE);