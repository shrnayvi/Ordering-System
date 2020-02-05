import React, { Component } from 'react';
import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Sidebar from '../Sidebar';

import { getSingle } from '../../../actions/item';

class Items extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <div className="main">
          <h1> <FormattedMessage id="single_item" /> </h1>
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ items }) => ({ byId: items.byId });
const mapDispatchToProps = {
  getSingle,
};


export default connect(mapStateToProps, mapDispatchToProps)(Items);