import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Button from '../../Button';

import { getAll } from '../../../actions/item';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
    }
  }

  componentDidMount() {
    this.props.getAll();
  }

  toggleAddClick= () => {
    this.setState({ ...this.state, isAdding: !this.state.isAdding });
  }

  render() {
    const { allIds, byId, idUI } = this.props.items;
    const { byId: mediaById } = this.props.media;

    const itemList = allIds.map(_id => (
      <ItemList 
        item={byId[_id]}
        avatar={mediaById[byId[_id].avatar]}
        key={_id}
        idUI={idUI}
      />
    ));
      console.log(this.state.isAdding)
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