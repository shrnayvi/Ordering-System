import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

export default props => {
  const { orders, items } = useSelector(({ orders, items }) => ({ orders: orders.byId, items: items.byId }));

  const { detail } = props;

  return (
    <React.Fragment>
      <tr>
        <td> {get(orders, `${detail.order}.orderNumber`, '')} </td>
        <td> {get(items, `${detail.item}.name`, '')} </td>
        <td> {detail.price} </td>
      </tr>
    </React.Fragment>
  )
}