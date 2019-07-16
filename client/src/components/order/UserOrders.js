import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../actions/orderActions';
import OrderList from '../OrderList';
import '../../assets/item.css';

class UserOrder extends Component {

  componentDidMount() {
    const { _id: userId } = this.props.user;
    this.props.fetchOrders(userId);
  }

  render() {
    const { userOrders } = this.props.order;
    return (
      <div>
        <h1>My Orders</h1>
        <OrderList orders={userOrders} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { user }, order }) => ({user, order });
const mapDispatchToProps = {
  fetchOrders,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);