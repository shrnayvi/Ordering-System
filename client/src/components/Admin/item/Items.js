import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Button from '../../Button';
import Pagination from '../../Pagination';

import config from '../../../constants/config';
import { getPagingArgs } from '../../../helpers/pagination';
import { getAll, fillRemainingDataWhenRemoving } from '../../../actions/item';
import { get as getCategory } from '../../../actions/category';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
    }
  }

  componentDidMount() {
    const pagingArgs = getPagingArgs(this.props.history.location)
    this.props.getCategory();
    this.props.getAll(pagingArgs);
  }

  toggleAddClick= () => {
    this.setState({ ...this.state, isAdding: !this.state.isAdding });
  }

  componentDidUpdate(prevProps) {
    const { allIds, total, startIndex, endIndex } = this.props.items;
    const idsLength = allIds.length;
    if(
      startIndex + idsLength - 1 < endIndex &&
      idsLength < prevProps.items.allIds.length && 
      idsLength < config.dataPerPage && 
      idsLength < total
      ) {
      this.props.fillRemainingDataWhenRemoving({ skip: startIndex + idsLength, limit: config.dataPerPage - idsLength });
    }
  }

  render() {
    const { allIds, byId, idUI, editedUpload, pageCount, currentPage } = this.props.items;
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
                <AddItem isAdding={this.state.isAdding} currentPage={currentPage} />
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

          <Pagination currentPage={currentPage} routePath="/admin/items" pageCount={pageCount} action={this.props.getAll} />

        </div>

      </React.Fragment>

    );
  }
}

const mapStateToProps = ({ items, media, categories }) => ({ items, media, categories });
const mapDispatchToProps = {
  getAll,
  getCategory,
  fillRemainingDataWhenRemoving,
}


export default connect(mapStateToProps, mapDispatchToProps)(Items);