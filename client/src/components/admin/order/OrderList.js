import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl';
import { ORDER as status } from '../../../helpers/status';

export default ({ orders, updateOrder }) => {
  let allOrders = orders
    .map(order => {
      return (
        <tr key={order._id}>
          <td>{order.orderNumber}</td>
          <td>{order.item.name}</td>
          <td><FormattedMessage id={status[order.status]}/></td>
          <td>{moment(order.createdAt).format('YYYY-MM-DD HH:mm')}</td>
          <td>
            <Form.Group controlId="status">
              <Form.Control name="status" as="select" onChange={e => updateOrder(e, order._id, e.target.value)}>
                <option value="">Select</option>
                <option value="-1">Pending</option>
                <option value="0">Cancel</option>
                <option value="1">Confirm</option>
                <option value="2">Delivered</option>
              </Form.Control>
            </Form.Group>
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
        {allOrders}
      </tbody>
    </Table>
  )
}