import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';
import { resetStatus, fetchAllUsers } from '../../../actions/userActions';
import AdminSidebar from '../sidebar/Sidebar';
import UserList from './UserList';

class Users extends Component {
  constructor(props) {
    super(props);
    this.props.resetStatus();
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const {
      userList,
    } = this.props.user;

    const users = userList.map(usr => <UserList key={usr._id} member={usr} /> )

    return (
      <div>
        <AdminSidebar/>
        <div className="main">
          {
            userList.length ?
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users}
              </tbody>
            </Table>
            : ''
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({ auth, user });
const mapDispatchToProps = {
  resetStatus,
  fetchAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);