import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCategory } from '../../../actions/categoryActions';
import routes from '../../../constants/routes';

class CategoryList extends Component{

  deleteCategory = _id => {
    this.props.removeCategory(_id)
  }
  
  render() {
    const { CATEGORY_EDIT } = routes;

    const {
      _id,
      name,
      description,
      slug,
    } = this.props.categoryData;

    return (
      <tr>
        <td>
          {name}
        </td>

        <td>
          {description}
        </td>

        <td>
          <Link className="btn btn-primary" to={CATEGORY_EDIT(slug)}><i className="fa fa-edit"></i></Link>
          <button className="btn btn-danger" onClick={() => this.deleteCategory(_id)}><i className="fa fa-trash"></i></button>
        </td>
        
      </tr>
    )
  }
}

const mapDispatchToProps = {
  removeCategory
};

export default connect(null, mapDispatchToProps)(CategoryList);