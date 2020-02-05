import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import ItemList from './ItemList';
import Pagination from '../../Pagination';

import { getPagingArgs, getPage } from '../../../helpers/pagination';
import { getAll } from '../../../actions/item';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
    }
  }

  componentDidMount() {
    const pagingArgs = getPagingArgs(this.props.history.location)
    this.props.getAll(pagingArgs);
  }

  toggleAddClick= () => {
    this.setState({ ...this.state, isAdding: !this.state.isAdding });
  }

  render() {
    const { allIds, byId, idUI, editedUpload, pageCount } = this.props.items;
    const { byId: mediaById } = this.props.media;

    const itemList = allIds.map(_id => (
      <div className="col-md-4 mt-4">
        <ItemList 
          item={byId[_id]}
          avatar={mediaById[byId[_id].avatar] || {}}
          key={_id}
          idUI={idUI[_id]}
          editedUpload={editedUpload[_id]}
        />

      </div>
    ));

    const page = getPage(this.props.history.location)

    return (
      <React.Fragment>
        <Sidebar />
        <div className="main">
          <h1><FormattedMessage id="item" /> </h1>

          <div className="container">
            <div className="row">
              { itemList }
            </div>

            <div className="mt-4">
              <Pagination currentPage={page} routePath="/items" pageCount={pageCount} action={this.props.getAll} />
            </div>
          </div>


        </div>

      </React.Fragment>

    );
  }
}

const mapStateToProps = ({ items, media }) => ({ items, media });
const mapDispatchToProps = {
  getAll,
}


export default connect(mapStateToProps, mapDispatchToProps)(Items);