import React, { Component } from 'react';
import Input from '../../Input';
import Button from '../../Button';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: this.props.item.name,
        description: this.props.item.description,
      },
    }
  }

  handleEdit = _ => {
    // const { idUI = {} } = this.props;
    // const isEditing = idUI.isEditing;
    // const _id = this.props.item._id;
    // if(isEditing) {
    //   this.props.updateItem(_id, this.state.item); 
    // } else {
    //   this.props.toggleEditState(_id);
    // }
  }

  handleChange = e => {
    this.setState({ item: { ...this.state.item, [e.target.name]: e.target.value } });
  }

  handleRemoveClick = _ => {
    // if(window.confirm('Are you sure?')) {
    //   this.props.removeItem(this.props.item._id);
    // } 
  }

  handleCancel = _ => {
    // this.props.toggleEditState(this.props.item._id);
  }

  render() {
    const { item, avatar, idUI = {} } = this.props;
    const isEditing = idUI.isEditing;
    const isRemoving = idUI.isDeleting;
    return (
      <tr>
        <td>
          {
            isEditing 
              ? <Input name="name" type="text" onChange={this.handleChange} defaultValue={item.name} />
              : item.name
          }
        </td>

        <td>
          {
            isEditing 
              ? <Input name="phone" type="text" onChange={this.handleChange} defaultValue={item.description} />
              : item.description
          }
        </td>


        <td>
          {item.price}
        </td>

        <td>
          {
            avatar && 
              <a target="_blank" href={`http://localhost:8000/uploads/${avatar.filename}`} rel="noopener noreferrer">
                <img alt="avatar" src={`http://localhost:8000/uploads/icon-${avatar.filename}`} />
              </a>
          }
        </td>

        <td></td>

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

export default ItemList;