import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { fetchBySlug } from '../../actions/itemActions';
import { placeOrder, addCart } from '../../actions/orderActions';
import { resetStatus } from '../../actions/cartActions';

class Item extends Component {
  constructor(props) {
    super(props);
    this.props.resetStatus();
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.props.fetchBySlug(params.slug);
  }

  /**
   * Place order
   * @param {String} _id Menu Item ID
   */
  placeOrder = () => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return this.props.history.push('/login');
    }
    const { _id } = this.props.item;
    this.props.placeOrder({ item: _id });
  }

  /**
   * Add to cart 
   */
  addToCart = () => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return this.props.history.push('/login');
    }
    const { _id } = this.props.item;
    this.props.addCart(_id);
  }


  render() {
    const {
      name,
      description,
      price,
    } = this.props.item;

    const {
      addingToCart,
      addedToCart,
      message,
      status,
    } = this.props.cart;

    return (
      <Row>
        <div>
          <h1>{name}</h1>
          <p> Price: {price} </p>
          <p> Description: {description} </p>

          {addedToCart &&
            <Alert variant={status === 200 ? 'success' : 'danger'}>
              <FormattedMessage id={message} />
            </Alert>
          }
          {
            addingToCart ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : <Button onClick={this.addToCart}><FormattedMessage id="add_to_cart" /></Button>
          }
        </div>
      </Row>
    )
  }
}

const mapStateToProps = ({ auth: { isLoggedIn }, items: { singleItem }, cart }) => ({
  isLoggedIn, item: singleItem, cart
});

const mapDispatchToProps = {
  fetchBySlug,
  placeOrder,
  addCart,
  resetStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);