import qs from 'query-string';
import pick from 'lodash/pick';

import { ORDER, ITEM, ORDER_DETAIL } from '../constants/actionTypes';
import config from '../constants/config';
import { get as getDetail } from '../apiCalls/orderDetail';


const fetchOrderDetails = (data, dispatch) => {
  const allIds = [];
  const byId = {};

  data.orderDetails.forEach(detail=> {
    const order = detail.order;
    const item = detail.item;

    detail['order'] = order._id;

    dispatch({ type: ORDER.UPDATE_ENTITY, payload: order });
    if(item) {
      detail['item'] = item._id;
      dispatch({ type: ITEM.UPDATE_ENTITY, payload: item });
    }

    allIds.push(detail._id);
    byId[detail._id] = detail;
  });

  return { allIds, byId };

}

export const get = (args = { currentPage: 1 }) => async dispatch => {

  const query = pick(args, ['skip', 'limit'])
  dispatch({ type: ORDER_DETAIL.FETCH_REQUEST });

  const { data: response } = await getDetail(args.orderId, qs.stringify(query));
  
  if(response.status === 200) {
    const data = fetchOrderDetails(response.data, dispatch);
    const paging = response.data.paging;
    const payload = {
      ...data,
      currentPage: args.currentPage,
      pageCount: Math.ceil(paging.total / config.dataPerPage),
      total: paging.total,
      startIndex: paging.startIndex,
      endIndex: paging.endIndex,
    };

    dispatch({ type: ORDER_DETAIL.FETCH_SUCCESS, payload });
  } else {
    dispatch({ type: ORDER_DETAIL.FETCH_FAILURE, payload: response.message });
  }
}