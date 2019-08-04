import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import { fetchAllOrders, updateOrder } from '../../../actions/orderActions';
import OrderList from './OrderList';
import AdminSidebar from '../sidebar/Sidebar';
import '../../../assets/item.css';

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      filterData: {
        status: null,
      }
    }
  }

  componentDidMount() {
    this.props.fetchAllOrders();
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if(value) {
      this.setState(
        { 
          filterData: {
            ...this.state.filterData,
            [name]: value 
          }
        }, () => {
        let filterData = {}
        let filterStates = this.state.filterData;
        for(let key in this.state.filterData) {
          if(filterStates[key]) {
            filterData[key] = filterStates[key];
          }
        }
        this.props.fetchAllOrders(filterStates);

      })

    }
  }

  updateOrder = (e, _id, status) => {
    if(status !== "") {
      this.props.updateOrder(_id, { status: +status }, 'user-order');
    }
    e.target.value = '';
  }

  render() {
    const { allOrders } = this.props.order;
    return (
      <div>
        <AdminSidebar />
        <div className="main">
          <h1>Orders</h1>
          <div>
            <h5>Filter by status</h5>
            <Form.Group controlId="status">
              <Form.Control name="status" as="select" onChange={this.handleChange}>
                <option value="">Select</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
              </Form.Control>
            </Form.Group>
          </div>
          <OrderList orders={allOrders} updateOrder={this.updateOrder} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ order }) => ({ order });
const mapDispatchToProps = {
  fetchAllOrders,
  updateOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);