import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import ShowError from '../../ShowError';
import Input from '../../Input';
import Button from '../../Button';

import { commonValidation } from '../../../helpers/validation';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: this.props.user.name,
        phone: this.props.user.phone,
      },
      error: {
        name: '',
        phone: '',
      }
    }
  }

  handleBlur = e => {
    const name = e.target.name;
    const value = e.target.value;
    if(value) {
      this.setState({ error: { ...this.state.error, [name]: '' } });
    }
  }

  checkValidation = () => {
    const valObj = commonValidation({ inputs: this.state.user, error: this.state.error });
    this.setState({ error: { ...this.state.error, ...valObj.errors} });
    return valObj.isFormValid;
  }

  handleEdit = _ => {
    const { idUI = {} } = this.props;
    const isInEditingState = idUI.isInEditingState;
    const _id = this.props.user._id;
    if(isInEditingState) {
      if(this.checkValidation()) {
        this.props.updateUser(_id, this.state.user); 
      }
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
    this.setState({ error: { name: '', phone: '' } });
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
              ? <div className="form-group">
                <Input name="name" type="text" onChange={this.handleChange} defaultValue={user.name} onBlur={this.handleBlur} />
                <ShowError message={this.state.error.name} />
              </div>
              : user.name
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                <Input name="phone" type="text" onChange={this.handleChange} defaultValue={user.phone} onBlur={this.handleBlur} />
                <ShowError message={this.state.error.phone} />
              </div>
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