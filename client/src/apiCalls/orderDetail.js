import * as http from '../helpers/request';
import { ORDER_DETAIL as orderDetail } from '../constants/apiRoutes';

export const get = (orderId, query) => http.get(orderDetail.GET_DETAILS(orderId, query));