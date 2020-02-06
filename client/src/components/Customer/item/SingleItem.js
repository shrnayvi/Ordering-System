import React, { Component } from 'react';
import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';

import Sidebar from '../Sidebar';
import Button from '../../Button';

import { getSingle } from '../../../actions/item';

class Items extends Component {

  componentDidMount() {
    const _id = get(this.props, 'match.params._id', '');

    if(!this.props.byId[_id]) {
      this.props.getSingle(_id);
    }
  }

  render() {
    const _id = get(this.props, 'match.params._id', '');

    const byId = this.props.byId;
    const { byId: mediaById} = this.props.media;
    const { byId: categoryById} = this.props.categories;

    const item = byId[_id] || {};
    const avatar = get(mediaById, `${item.avatar}.filename`);
    const category = get(categoryById, `${item.category}.name`);

    return (
      <React.Fragment>
        <Sidebar />
        <div className="main">
          <h1> <FormattedMessage id="single_item" /></h1>
          <div>
            { avatar && <img alt="avatar" src={`http://localhost:8000/uploads/medium-${avatar}`} /> }
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{category}</p>
            <Button label="add_to_cart" />
          </div>
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ items, media, categories }) => ({ byId: items.byId , media, categories});
const mapDispatchToProps = {
  getSingle,
};


export default connect(mapStateToProps, mapDispatchToProps)(Items);