import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserList extends Component{
  render() {
    const {
      name,
      email,
      username,
      role,
      phone,
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
          <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
          <button className="btn btn-danger" ><i className="fa fa-trash"></i></button>
        </td>
        
      </tr>
    )
  }
}

export default connect(null, null)(UserList);