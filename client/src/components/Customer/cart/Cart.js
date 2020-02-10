import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import LabelInput from '../../LabelInput';
import Button from '../../Button';
import SelectEvent from './SelectEvent';
import Sidebar from '../Sidebar';
import CartList from './CartList';
import Pagination from '../../Pagination';

import { get as getCart, changeCombinedOrder } from '../../../actions/cart';

export default props => {
  const dispatch = useDispatch();
  const {
    allIds,
    byId,
    currentPage,
    pageCount,
  } = useSelector(({ cart }) => cart);

  useEffect(() => {
    const pagingArgs = { skip: 0, limit: 50 };
    dispatch(getCart(pagingArgs));
  }, [dispatch])

  const handleCombinedOrder = e => {
    dispatch(changeCombinedOrder(+e.target.value));
  }

  const cartList = allIds.map(_id => {
    return (
      <CartList 
        cart={byId[_id]}
        key={_id}
      />
    )
  });

  const total = allIds.reduce((total, current) => {
    return total + byId[current].item.price * byId[current].quantity
  }, 0);

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1><FormattedMessage id="cart" /></h1>
        {
          allIds.length ? 
            <div>
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

                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total: {total}</td>
                    <td></td>
                  </tr>

                </tbody>

              </table>
              <SelectEvent />
              <LabelInput type="number" label="number_of_combined_order" handleChange={handleCombinedOrder}/>
              <Button label="order" />
            </div>
            : 'Cart Empty'
        }
        <Pagination currentPage={currentPage} pageCount={pageCount} />
      </div>
    </React.Fragment>
  );
}