import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import { resetStatus, fetchAllCategory } from '../../../actions/categoryActions';
import AdminSidebar from '../sidebar/Sidebar';
import CategoryList from './CategoryList';
import Pagination from '../../Pagination';
import getPageNumber from '../../../helpers/getPageNumber';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.props.resetStatus();
  }

  componentDidMount() {
    const page = getPageNumber(this.props.history.location)
    this.props.fetchAllCategory(page);
  }

  render() {
    const {
      categories,
      pageCount,
    } = this.props.category;

    const page = getPageNumber(this.props.history.location)

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
          
          <Pagination currentPage={page} routePath="/admin/categories" pageCount={pageCount} action={this.props.fetchAllCategory} />
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