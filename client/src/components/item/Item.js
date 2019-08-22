import React, { Component } from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { fetchItems } from '../../actions/itemActions';
import { placeOrder } from '../../actions/orderActions';
import ItemCard from './ItemCard';
import Sidebar from '../customer/sidebar/Sidebar';
import Pagination from '../Pagination';
import getPageNumber from '../../helpers/getPageNumber';
import '../../assets/item.css';

class Item extends Component {

  componentDidMount() {
    const page = getPageNumber(this.props.history.location)
    this.props.fetchItems(page);
  }

  render() {
    const { 
      itemData,
      pageCount,
    } = this.props;
    
    const page = getPageNumber(this.props.history.location)

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
      <div>
        <Sidebar />    
        <div className="main">
          {items}
          <Pagination currentPage={page} routePath="/items" pageCount={pageCount} action={this.props.fetchItems} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ items }) => items;
const mapDispatchToProps = {
  fetchItems,
  placeOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);