import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeQuantity, removeFromCart } from '../../../actions/cartActions';

class CartItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      _id: props.cart._id,
      price: props.cart.item.price,
      quantity: props.cart.quantity,
      subtotal: props.cart.quantity * props.cart.item.price
    }
  }

  handleChange = (e) => {
    let quantity = e.target.value;
    let subtotal =  this.state.price * quantity;
    this.props.changeQuantity(this.state._id, +quantity);
    this.setState({ ...this.state, quantity, subtotal });
  }

  render() {
    let {
      item: {
        name, price, description
      },
    } = this.props.cart;
    
    return (
      <tr>
        <td>
          <p> {name} <br /> {description}</p>
        </td>
        
        <td>Rs. {price}</td>

        <td>
          <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
        </td>

        <td>Rs. {this.state.subtotal}</td>

        <td>
          <button className="btn btn-danger" onClick={() => this.props.removeFromCart(this.state._id)}><i className="fa fa-trash"></i></button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({ cart }) => cart
const mapDispatchToProps = {
  changeQuantity,
  removeFromCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);