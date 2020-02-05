import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify'
import Pagination from '../../Pagination';

import Sidebar from '../Sidebar';
import UserList from './UserList';

import getPageNumber from '../../../helpers/getPageNumber';
import { getAll, updateUser, removeUser, toggleEditState } from '../../../actions/user';

import '../../../assets/users.css';

class Users extends Component {

  componentDidMount() {
    const page = getPageNumber(this.props.history.location)
    this.props.getAll(`page=${page}`);
  }

  render() {
    const { users, media } = this.props;
    const { pageCount } = users;
    console.log(users);

    const userList = users.allIds.map(_id => (
      <UserList 
        user={users.byId[_id]} 
        key={_id} 
        idUI={users.idUI[_id]}
        updateUser={this.props.updateUser}
        removeUser={this.props.removeUser}
        toggleEditState={this.props.toggleEditState}
        avatar={media.byId[users.byId[_id].avatar]}
      />
    ));

    const page = getPageNumber(this.props.history.location)

    return (
      <React.Fragment>
        <Sidebar />
        <div className="main">
          <h1>
            <FormattedMessage id="all_users" />
          </h1>
          <table className="table">
            <tbody>
              <tr>
                <th> <FormattedMessage id="avatar" /> </th>
                <th> <FormattedMessage id="email" /> </th>
                <th> <FormattedMessage id="name" /> </th>
                <th> <FormattedMessage id="phone" /> </th>
                <th> <FormattedMessage id="role" /> </th>
                <th> <FormattedMessage id="action" /> </th>
              </tr>

              { userList }

            </tbody>
          </table>

          <Pagination currentPage={page} routePath="/admin/users" pageCount={pageCount} action={this.props.getAll} />

        </div>

        <ToastContainer />

      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ users, media }) => ({ users, media });
const mapDispatchToProps = {
  getAll,
  updateUser, 
  removeUser,
  toggleEditState,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);