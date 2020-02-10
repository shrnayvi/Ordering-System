import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Sidebar from '../Sidebar';
import CartList from './CartList';
import Pagination from '../../Pagination';

import { getPagingArgs } from '../../../helpers/pagination';
import { get as getCart } from '../../../actions/cart';

export default props => {
  const dispatch = useDispatch();
  const {
    allIds,
    byId,
    currentPage,
    pageCount,
  } = useSelector(({ cart }) => cart);

  useEffect(() => {
    const pagingArgs = getPagingArgs(props.history.location);
    dispatch(getCart(pagingArgs));
  }, [dispatch, props.history.location])

  const cartList = allIds.map(_id => {
    console.log(byId[_id]);
    return (
      <CartList 
        cart={byId[_id]}
        key={_id}
      />
    )
  });

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1><FormattedMessage id="cart" /></h1>
        <table className="table">
          <tbody>
            <tr>
              <th> <FormattedMessage id="item" /> </th>
              <th> <FormattedMessage id="price" /> </th>
              <th> <FormattedMessage id="quantity" /> </th>
              <th> <FormattedMessage id="sub_total" /> </th>
              <th> <FormattedMessage id="action" /> </th>
            </tr>

            {cartList}

          </tbody>
        </table>
        <Pagination currentPage={currentPage} pageCount={pageCount} />
      </div>
    </React.Fragment>
  );
}