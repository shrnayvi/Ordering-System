import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Button from '../../Button';
import Pagination from '../../Pagination';

import getPageNumber from '../../../helpers/getPageNumber';
import { getAll, remove, toggleEditState, edit } from '../../../actions/item';
import { get as getCategory } from '../../../actions/category';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
    }
  }

  componentDidMount() {
    const page = getPageNumber(this.props.history.location)
    this.props.getCategory();
    this.props.getAll(`page=${page}`);
  }

  toggleAddClick= () => {
    this.setState({ ...this.state, isAdding: !this.state.isAdding });
  }

  render() {
    const { allIds, byId, idUI, editedUpload, pageCount } = this.props.items;
    const { byId: mediaById } = this.props.media;
    const { byId: categoryById } = this.props.categories;

    const itemList = allIds.map(_id => (
      <ItemList 
        item={byId[_id]}
        avatar={mediaById[byId[_id].avatar] || {}}
        key={_id}
        idUI={idUI[_id]}
        category={categoryById[byId[_id].category]}
        allCategories={this.props.categories}
        editedUpload={editedUpload[_id]}
      />
    ));

    const page = getPageNumber(this.props.history.location)

    return (
      <React.Fragment>
        <Sidebar />
        <div className="main">
          <div className="odr-item-title">
            <h1><FormattedMessage id="item" /> </h1>
            <Button label={this.state.isAdding ? 'cancel': 'add'} onClick={this.toggleAddClick} />
          </div>

          <div className="odr-add-item">
            {
              this.state.isAdding && 
                <AddItem isAdding={this.state.isAdding} />
            }
          </div>

          <div className="odr-item-list mt-3">
            <table className="table">
              <tbody>
                <tr>
                  <th> <FormattedMessage id="name" /> </th>
                  <th> <FormattedMessage id="description" /> </th>
                  <th> <FormattedMessage id="price" /> </th>
                  <th> <FormattedMessage id="avatar" /> </th>
                  <th> <FormattedMessage id="category" /> </th>
                  <th> <FormattedMessage id="action" /> </th>
                </tr>

                { itemList }

              </tbody>
            </table>

          </div>

          <Pagination currentPage={page} routePath="/admin/items" pageCount={pageCount} action={this.props.getAll} />

        </div>

      </React.Fragment>

    );
  }
}

const mapStateToProps = ({ items, media, categories }) => ({ items, media, categories });
const mapDispatchToProps = {
  getAll,
  remove,
  toggleEditState,
  getCategory,
  edit,
}


export default connect(mapStateToProps, mapDispatchToProps)(Items);