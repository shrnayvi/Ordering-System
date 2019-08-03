import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { removeUser } from '../../../actions/userActions';
import { USER as userStatus } from '../../../helpers/status';
import routes from '../../../constants/routes';

class UserList extends Component{

  deleteUser = _id => {
    this.props.removeUser(_id)
  }
  
  render() {
    const { USER_EDIT } = routes;

    const {
      _id,
      name,
      email,
      username,
      role,
      phone,
      status,
    } = this.props.member;

    return (
      <tr>
        <td>
          {name}
        </td>

        <td>
          {email}
        </td>

        <td>
          {username}
        </td>

        <td>
          {phone}
        </td>

        <td>
          {role}
        </td>
        
        <td>
          <FormattedMessage id={userStatus[status]} />
        </td>

        <td>
          <Link className="btn btn-primary" to={USER_EDIT(_id)}><i className="fa fa-edit"></i></Link>
          <button className="btn btn-danger" onClick={() => this.deleteUser(_id)}><i className="fa fa-trash"></i></button>
        </td>
        
      </tr>
    )
  }
}

const mapDispatchToProps = {
  removeUser
};

export default connect(null, mapDispatchToProps)(UserList);