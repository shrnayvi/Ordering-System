import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder } from '../../../actions/orderActions';
import OrderList from './OrderList';
import Sidebar from '../sidebar/Sidebar';
import '../../../assets/item.css';

class UserOrder extends Component {

  componentDidMount() {
    const { _id: userId } = this.props.user;
    this.props.fetchOrders(userId);
  }

  cancelOrder = _id => {
    this.props.updateOrder(_id, { status: 0 });
  }

  render() {
    const { userOrders } = this.props.order;
    return (
      <div>
        <Sidebar />
        <div className="main">
          <h1>My Orders</h1>
          <OrderList orders={userOrders} cancelOrder={this.cancelOrder} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { user }, order }) => ({user, order });
const mapDispatchToProps = {
  fetchOrders,
  updateOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);