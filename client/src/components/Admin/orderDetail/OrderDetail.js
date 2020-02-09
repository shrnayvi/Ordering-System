import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Sidebar from '../Sidebar';
import DetailList from './DetailList';
import Pagination from '../../Pagination';

import { getPagingArgs } from '../../../helpers/pagination';
import { get } from '../../../actions/orderDetail';

export default props => {

  const dispatch = useDispatch();

  const {
    allIds,
    byId,
    currentPage,
    pageCount,
    idUI,
  } = useSelector(state => state.orderDetails);

  useEffect(() => {
    const orderId = props.match.params.orderId;
    const pagingArgs = getPagingArgs(props.history.location);
    dispatch(get({ orderId, ...pagingArgs }))
  }, [dispatch, props.history.location, props.match.params.orderId]);

  const detailList = allIds.map(_id => (
    <DetailList
      key={_id}
      detail={byId[_id]}
      idUI={idUI[_id] || {}}
    />
  ));

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1> <FormattedMessage id="order_detail" /> </h1>

        <table className="table mt-2">
          <thead>
            <tr>
              <th><FormattedMessage id="order" /></th>
              <th><FormattedMessage id="item" /></th>
              <th><FormattedMessage id="price" /></th>
            </tr>
          </thead>
          <tbody>
            {detailList}
          </tbody>
        </table>

        <div className="mt-4">
          <Pagination currentPage={currentPage} routePath="/admin/orders" pageCount={pageCount} />
        </div>
      </div>
    </React.Fragment>
  );
}
