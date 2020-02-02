import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify'

import Sidebar from '../Sidebar';
import UserList from './UserList';
import { getAll, updateUser, removeUser, toggleEditState } from '../../../actions/user';

class Users extends Component {

  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const users = this.props.users;
    console.log(users);

    const userList = users.allIds.map(_id => (
      <UserList 
        user={users.byId[_id]} 
        key={_id} 
        idUI={users.idUI[_id]}
        updateUser={this.props.updateUser}
        removeUser={this.props.removeUser}
        toggleEditState={this.props.toggleEditState}
      />
    ));

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
                <th> <FormattedMessage id="email" /> </th>
                <th> <FormattedMessage id="name" /> </th>
                <th> <FormattedMessage id="phone" /> </th>
                <th> <FormattedMessage id="role" /> </th>
                <th> <FormattedMessage id="status" /> </th>
                <th> <FormattedMessage id="action" /> </th>
              </tr>

              { userList }

            </tbody>
          </table>
        </div>

        <ToastContainer />

      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ users }) => ({ users });
const mapDispatchToProps = {
  getAll,
  updateUser, 
  removeUser,
  toggleEditState,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);