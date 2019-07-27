import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { fetchItems } from '../../actions/itemActions';
import { placeOrder } from '../../actions/orderActions';
import ItemCard from '../ItemCard';
import '../../assets/item.css';

class Item extends Component {

  componentDidMount() {
    const { params } = this.props.match;
    this.props.fetchItems(params.slug);
  }

  render() {
    const { itemData } = this.props;
    const items = itemData
      .map(item => (
        <Col key={item._id}>
          <ItemCard
            title={item.title}
            description={item.description}
            price={item.price}
            slug={item.slug}
            placeOrder={this.placeOrder}
          />
        </Col>
      )
      );
    return (
      <Row>
        {items}
      </Row>
    )
  }
}

const mapStateToProps = ({ items }) => items;
const mapDispatchToProps = {
  fetchItems,
  placeOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);