import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table'
import { FormattedMessage } from 'react-intl';
import { ORDER as status } from '../../../helpers/status';

export default ({ orders, cancelOrder }) => {
  let userOrders = orders
    .map(order => {
      return (
        <tr key={order._id}>
          <td>{order.orderNumber}</td>
          <td>{order.item.name}</td>
          <td><FormattedMessage id={status[order.status]}/></td>
          <td>{moment(order.createdAt).format('YYYY-MM-DD HH:mm')}</td>
          <td>
            {
              [-1, 1].includes(order.status) 
                ? <button className="btn btn-danger" onClick={() => cancelOrder(order._id)}><FormattedMessage id="cancel_order" /></button>
                : ''
            }
          </td>
       </tr>
      )
    })
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th><FormattedMessage id="order_number" /></th>
          <th><FormattedMessage id="ordered_item" /></th>
          <th><FormattedMessage id="status" /></th>
          <th><FormattedMessage id="date" /></th>
          <th><FormattedMessage id="action" /></th>
        </tr>
      </thead>
      <tbody>
        {userOrders}
      </tbody>
    </Table>
  )
}