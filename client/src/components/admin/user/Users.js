import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { resetStatus, fetchAllUsers } from '../../../actions/userActions';
import AdminSidebar from '../sidebar/Sidebar';
import UserList from './UserList';
import Pagination from '../../Pagination';
import getPageNumber from '../../../helpers/getPageNumber';

class Users extends Component {
  constructor(props) {
    super(props);
    this.props.resetStatus();
  }

  componentDidMount() {
    const page = getPageNumber(this.props.history.location)
    this.props.fetchAllUsers(page);
  }

  render() {
    const {
      userList,
      pageCount,
    } = this.props.user;

    const page = getPageNumber(this.props.history.location)
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

          <Pagination currentPage={page} routePath="/admin/users" pageCount={pageCount} action={this.props.fetchAllUsers} />

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