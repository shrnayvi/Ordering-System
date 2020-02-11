import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Sidebar from '../Sidebar';
import OrderList from './OrderList';
import Pagination from '../../Pagination';

import { getPagingArgs } from '../../../helpers/pagination';
import { get } from '../../../actions/order';

export default props => {

  const dispatch = useDispatch();

  const {
    allIds,
    byId,
    currentPage,
    pageCount,
    idUI,
  } = useSelector(state => state.orders);


  useEffect(() => {
    const pagingArgs = getPagingArgs(props.history.location);
    dispatch(get(pagingArgs))
  }, [dispatch, props.history.location]);

  const orderList = allIds.map(_id => (
    <OrderList
      key={_id}
      order={byId[_id]}
      idUI={idUI[_id] || {}}
    />
  ));

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1> <FormattedMessage id="orders" /> </h1>

        <table className="table mt-2">
          <thead>
            <tr>
              <th><FormattedMessage id="order_number" /></th>
              <th><FormattedMessage id="event" /></th>
              <th><FormattedMessage id="status" /></th>
              <th><FormattedMessage id="total_price" /></th>
              <th><FormattedMessage id="total_quantity" /></th>
              <th><FormattedMessage id="action" /></th>
            </tr>
          </thead>
          <tbody>
            {orderList}
          </tbody>
        </table>

        <div className="mt-4">
          <Pagination currentPage={currentPage} routePath="/customer/orders" pageCount={pageCount} />
        </div>
      </div>
    </React.Fragment>
  );
}
