import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem } from '../../../actions/itemActions';
import routes from '../../../constants/routes';

class ItemList extends Component{

  deleteItem = _id => {
    this.props.removeItem(_id)
  }
  
  render() {
    const { ITEM_EDIT } = routes;

    const {
      _id,
      name,
      description,
      slug,
      price,
      category,
    } = this.props.itm;

    let categoryName = (category || {}).name || '';

    return (
      <tr>
        <td>
          {'avatar'}
        </td>

        <td>
          {name}
        </td>

        <td>
          {description}
        </td>

        <td>
          {price}
        </td>

        <td>
          {categoryName}
        </td>

        <td>
          <Link className="btn btn-primary" to={ITEM_EDIT(slug)}><i className="fa fa-edit"></i></Link>
          <button className="btn btn-danger" onClick={() => this.deleteItem(_id)}><i className="fa fa-trash"></i></button>
        </td>
        
      </tr>
    )
  }
}

const mapDispatchToProps = {
  removeItem, 
};

export default connect(null, mapDispatchToProps)(ItemList);