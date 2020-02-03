import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import ItemList from './ItemList';
import { getAll } from '../../../actions/item';

class Items extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const { allIds, byId, idUI } = this.props.items;

    const itemList = allIds.map(_id => (
      <ItemList 
        item={byId[_id]}
        avatar={null}
        key={_id}
        idUI={idUI}
      />
    ));
    return (
      <React.Fragment>
        <Sidebar />
        <div className="main">
          <h1> <FormattedMessage id="item" /></h1>

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

      </React.Fragment>

    );
  }
}

const mapStateToProps = ({ items }) => ({ items });
const mapDispatchToProps = {
  getAll,
}


export default connect(mapStateToProps, mapDispatchToProps)(Items);