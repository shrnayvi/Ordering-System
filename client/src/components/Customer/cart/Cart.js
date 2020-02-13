import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';

import LabelInput from '../../LabelInput';
import Button from '../../Button';
import SelectEvent from './SelectEvent';
import Sidebar from '../Sidebar';
import CartList from './CartList';
import Pagination from '../../Pagination';

import { commonValidation } from '../../../helpers/validation';
import { get as getCart, changeCombinedOrder } from '../../../actions/cart';
import { create as createOrder } from '../../../actions/order';

export default _ => {
  const dispatch = useDispatch();
  const {
    allIds,
    byId,
    currentPage,
    pageCount,
    numberOfCombinedOrder,
    event,
  } = useSelector(({ cart }) => cart);

  const [error, setError] = useState({ event: '' });

  const isPlacingOrder = useSelector(({ isAdding }) => isAdding) ;

  useEffect(() => {
    const pagingArgs = { skip: 0, limit: 50 };
    dispatch(getCart(pagingArgs));
  }, [dispatch])

  const checkValidation = _ => {
    const valObj = commonValidation({ inputs: { event } });
    setError({ ...error, ...valObj.errors });
    return valObj.isFormValid;
  }

  const handleBlur = e => {
    if(e.target.value) {
      setError({ ...error, [e.target.name]: '' });
    }
  }

  const handleCombinedOrder = e => {
    dispatch(changeCombinedOrder(+e.target.value));
  }

  const placeOrder = _ => {
    const data = {
      event,
      numberOfCombinedOrder,
      orders: allIds.map(_id => ({ item: byId[_id].item._id, quantity: byId[_id].quantity })),
    }
    if(checkValidation()) {
      dispatch(createOrder(data));
    }
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

              <SelectEvent errorMessage={error.event} onBlur={handleBlur} />

              <LabelInput type="number" label="number_of_combined_order" handleChange={handleCombinedOrder}/>
              <Button label="order" isLoading={isPlacingOrder} handleClick={placeOrder} />
            </div>
            : 'Cart Empty'
        }
        <Pagination currentPage={currentPage} pageCount={pageCount} />
      </div>

      <ToastContainer autoClose={2000}/>
    </React.Fragment>
  );
}