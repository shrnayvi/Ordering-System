import React from 'react';
import Table from 'react-bootstrap/Table'

export default ({ orders }) => {
  let userOrders = orders
    .map(order => {
      return (
        <tr key={order._id}>
          <td>{order.orderNumber}</td>
          <td>{order.item.name}</td>
          <td>{order.status}</td>
          <td>{order.createdAt}</td>
          <td><button>Cancel Order</button></td>
        </tr>
      )
    })
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Ordered Item</th>
          <th>Status</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userOrders}
      </tbody>
    </Table>
  )
}