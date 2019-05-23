import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { fetchBySlug } from '../../actions/itemActions';

class Item extends Component {

   componentDidMount() {
      const { params } = this.props.match;
      this.props.fetchBySlug(params.slug);
   }

   render() {
      const {
         name,
         description,
         price,
      } = this.props.item;
      return (
         <Row>
            <div>
               <h1>{name}</h1>
               <p> Price: {price} </p>
               <p> Description: {description} </p>
               <Link to='/order'>Place Order</Link>
            </div>
         </Row>
      )
   }
}

const mapStateToProps = ({ items: { singleItem }}) => ({ item: singleItem});
const mapDispatchToProps = {
   fetchBySlug,
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);