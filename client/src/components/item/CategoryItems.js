import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { fetchByCategory } from '../../actions/itemActions';
import ItemCard from '../ItemCard';
import '../../assets/item.css';

class CategoryItems extends Component {
  componentDidMount() {
    const { params: { id } } = this.props.match;
    this.props.fetchByCategory(id);
  }

  render() {
    const { categoryItems } = this.props;
    const items = categoryItems 
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
  fetchByCategory,
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryItems);