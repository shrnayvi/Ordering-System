import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from '../../Input';
import Button from '../../Button';
import { USER as userStatus } from '../../../constants/status';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: this.props.user.name,
        phone: this.props.user.phone,
      },
    }
  }

  handleEdit = _ => {
    const { idUI = {} } = this.props;
    const isEditing = idUI.isEditing;
    const _id = this.props.user._id;
    if(isEditing) {
      this.props.updateUser(_id, this.state.user); 
    } else {
      this.props.toggleEditState(_id);
    }
  }

  handleChange = e => {
    this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } });
  }

  handleRemoveClick = _ => {
    if(window.confirm('Are you sure?')) {
      this.props.removeUser(this.props.user._id);
    } 
  }

  handleCancel = _ => {
    this.props.toggleEditState(this.props.user._id);
  }

  render() {
    const { user, avatar, idUI = {} } = this.props;
    const isEditing = idUI.isEditing;
    const isRemoving = idUI.isDeleting;
    return (
      <tr>
        <td>
          {
            avatar && 
              <a target="_blank" href={`http://localhost:8000/uploads/${avatar.filename}`} rel="noopener noreferrer">
                <img alt="avatar" src={`http://localhost:8000/uploads/icon-${avatar.filename}`} />
              </a>
          }
        </td>
        <td>{user.email}</td>
        <td>
          {
            isEditing 
              ? <Input name="name" type="text" onChange={this.handleChange} defaultValue={user.name} />
              : user.name
          }
        </td>

        <td>
          {
            isEditing 
              ? <Input name="phone" type="text" onChange={this.handleChange} defaultValue={user.phone} />
              : user.phone
          }
        </td>

        <td><FormattedMessage id={user.role} /></td>

        <td><FormattedMessage id={userStatus[user.status]} /></td>

        <td>
          <Button label="edit" className="btn btn-success" icon={isEditing ? '' : 'edit'} onClick={this.handleEdit} />
          <Button label="remove" className="btn btn-danger" icon="remove" onClick={this.handleRemoveClick} isLoading={isRemoving} />
          { 
            isEditing ? 
              <Button label="cancel" className="btn btn-danger" onClick={this.handleCancel} />
              : ''
          }
        </td>
      </tr>
    )

  }
}

export default UserList;