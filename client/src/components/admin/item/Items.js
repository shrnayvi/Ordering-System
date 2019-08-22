import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import { resetStatus, fetchItems } from '../../../actions/itemActions';
import AdminSidebar from '../sidebar/Sidebar';
import ItemList from './ItemList';
import Pagination from '../../Pagination';
import getPageNumber from '../../../helpers/getPageNumber';

class Items extends Component {
  constructor(props) {
    super(props);
    this.props.resetStatus();
  }

  componentDidMount() {
    const page = getPageNumber(this.props.history.location)
    this.props.fetchItems(page);
  }

  render() {
    const {
      itemData,
      pageCount,
    } = this.props.items;

    const page = getPageNumber(this.props.history.location)

    const itemList = itemData.map(itm => <ItemList key={itm._id} itm={itm} /> )

    return (
      <div>
        <AdminSidebar/>
        <div className="main">
          <h1><FormattedMessage id="items" /></h1>
          {
            itemData.length ?
            <Table responsive>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemList}
              </tbody>
            </Table>
            : ''
          }

          <Pagination currentPage={page} routePath="/admin/items" pageCount={pageCount} action={this.props.fetchItems} />

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ items }) => ({ items });
const mapDispatchToProps = {
  resetStatus,
  fetchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);