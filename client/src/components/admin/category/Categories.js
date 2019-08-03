import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import { resetStatus, fetchAllCategory } from '../../../actions/categoryActions';
import AdminSidebar from '../sidebar/Sidebar';
import CategoryList from './CategoryList';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.props.resetStatus();
  }

  componentDidMount() {
    this.props.fetchAllCategory();
  }

  render() {
    const {
      categories,
    } = this.props.category;

    const categoryList = categories.map(ctg => <CategoryList key={ctg._id} categoryData={ctg} /> )

    return (
      <div>
        <AdminSidebar/>
        <div className="main">
          <h1><FormattedMessage id="categories" /></h1>
          {
            categories.length ?
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryList}
              </tbody>
            </Table>
            : ''
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ category }) => ({ category });
const mapDispatchToProps = {
  resetStatus,
  fetchAllCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);