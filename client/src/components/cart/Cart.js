import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import CartItem from './CartItem';
import { fetchCart } from '../../actions/cartActions';

class Cart extends Component {

  componentDidMount() {
    this.props.fetchCart();
  }


  render() {
    const { cartItems, fetchingCart, totalPrice } = this.props;
    let cart = cartItems.map(c => <CartItem key={c._id} cart={c} />)
    
    return (
      <div>
        <h1>
          <FormattedMessage id="my_cart" /> 
        </h1>
        {
          fetchingCart ? <p>Fetching Cart....</p> : ''
        }
        <Table responsive>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart}
            {
              totalPrice 
              ? <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total: Rs. {totalPrice}</td>
                <td><button className="btn btn-primary">Place Order</button></td>
              </tr>
              : ''
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => cart;
const mapDispatchToProps = {
  fetchCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);