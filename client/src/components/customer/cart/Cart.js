import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CartItem from './CartItem';
import { fetchCart } from '../../../actions/cartActions';
import { placeOrder, resetPlacedOrder } from '../../../actions/orderActions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.props.resetPlacedOrder();
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  placeOrder = () => {
    const orders = this.props.userCart.cartItems.map(cart => ({ item: cart.item._id, quantity: cart.quantity }))
    this.props.placeOrder(orders);
  }

  render() {
    const { cartItems, fetchingCart, totalPrice } = this.props.userCart;
    const { placingOrder, placedOrder, message: orderMessage, status: placedOrderStatus } = this.props.order;
    let cart = cartItems.map(c => <CartItem key={c._id} cart={c} />)
    
    return (
      <div>
        <h1>
          <FormattedMessage id="my_cart" /> 
        </h1>
        
        { fetchingCart ? <p>Fetching Cart....</p> : '' }

        {
          placedOrder && placedOrderStatus === 200 &&
            <Alert variant='success'>
              <FormattedMessage id={orderMessage} />
            </Alert>
        }

        {
          cartItems.length ?
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
                  <td><b>Total: Rs. {totalPrice}</b></td>
                  <td>
                  {
                    placingOrder ?
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      /> : <Button onClick={this.placeOrder}><FormattedMessage id="place_order" /></Button>
                  }
                  </td>
                </tr> : <tr></tr>
              }
            </tbody>
          </Table>
          : ''
        }

        {
          !placedOrder && !cartItems.length &&
            <Alert variant='primary'>
              <FormattedMessage id="cart_empty" />
            </Alert>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ cart, order }) => ({ userCart: cart, order });
const mapDispatchToProps = {
  fetchCart,
  placeOrder,
  resetPlacedOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);