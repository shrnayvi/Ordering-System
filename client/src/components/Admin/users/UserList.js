import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from '../../Input';
import Button from '../../Button';

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
    const isInEditingState = idUI.isInEditingState;
    const _id = this.props.user._id;
    if(isInEditingState) {
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
    const isInEditingState = idUI.isInEditingState;
    const isRemoving = idUI.isRemoving;
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
            isInEditingState 
              ? <Input name="name" type="text" onChange={this.handleChange} defaultValue={user.name} />
              : user.name
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <Input name="phone" type="text" onChange={this.handleChange} defaultValue={user.phone} />
              : user.phone
          }
        </td>

        <td><FormattedMessage id={user.role} /></td>

        <td>
          <Button label="edit" className="btn btn-success" icon={isInEditingState ? '' : 'edit'} onClick={this.handleEdit} isLoading={isEditing} />
          <Button label="remove" className="btn btn-danger" icon="remove" onClick={this.handleRemoveClick} isLoading={isRemoving} />
          { 
            isInEditingState ? 
              <Button label="cancel" className="btn btn-danger" onClick={this.handleCancel} />
              : ''
          }
        </td>
      </tr>
    )

  }
}

export default UserList;