import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import Input from '../../Input';
import Textarea from '../../Textarea';
import Button from '../../Button';
import ImageUpload from '../../ImageUpload';
import ShowError from '../../ShowError';

import { commonValidation } from '../../../helpers/validation';

import { 
  remove, 
  toggleEditState, 
  edit, 
  uploadEditedItemMedia 
} from '../../../actions/item';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: this.props.item.name,
        description: this.props.item.description,
        price: this.props.item.price,
        category: this.props.item.category,
      },
      error: {
        name: '',
        description: '',
        price: '',
        category: '',
      }
    }
  }

  handleBlur = e => {
    if(e.target.value) {
      this.setState({ error: { ...this.state.error, [e.target.name]: '' } });
    }
  }

  checkValidation = () => {
    const valObj = commonValidation({ inputs: this.state.item, error: this.state.error });
    this.setState({ error: { ...this.state.error, ...valObj.errors} });
    return valObj.isFormValid;
  }

  handleEdit = _ => {
    const { idUI = {} } = this.props;
    const isInEditingState = idUI.isInEditingState;
    const _id = this.props.item._id;
    const avatar = get(this.props, 'editedUpload._id', null);
    const data = { ...this.state.item }
    if(avatar) {
      data['avatar'] = avatar;
    }
    
    if(isInEditingState) {
      if(this.checkValidation()) {
        this.props.edit(_id, data); 
      }
    } else {
      this.setState({ error: { name: '', description: '', price: '' } });
      this.props.toggleEditState(_id);
    }
  }

  handleChange = e => {
    this.setState({ item: { ...this.state.item, [e.target.name]: e.target.value } });
  }

  handleRemoveClick = _ => {
    if(window.confirm('Are you sure?')) {
      this.props.remove(this.props.item._id);
    } 
  }

  handleImage = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('attachment', file)

    this.props.uploadEditedItemMedia(this.props.item._id, formData);
  }

  handleCancel = _ => {
    this.props.toggleEditState(this.props.item._id);
  }
  
  render() {
    const { item, avatar, idUI = {}, category } = this.props;
    const isInEditingState = idUI.isInEditingState;
    const isUploading = idUI.isUploading;
    const isRemoving = idUI.isDeleting;

    const { allIds: categories, byId: categoryId } = this.props.allCategories;
    const categoryOptions = categories.map(_id => (<option key={_id} value={_id}>{categoryId[_id].name}</option>))

    const editedAvatarFilename = get(this.props, 'editedUpload.filename', null);
    const editedAvatarId = get(this.props, 'editedUpload._id', null);

    return (
      <tr>
        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                  <Input 
                    name="name" 
                    type="text" 
                    onChange={this.handleChange} 
                    defaultValue={item.name} 
                    onBlur={this.handleBlur}
                  />
                  <ShowError message={this.state.error.name} />
                </div>
              : item.name
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                  <Textarea 
                    name="description" 
                    onChange={this.handleChange} 
                    defaultValue={item.description} 
                    onBlur={this.handleBlur}
                  />
                  <ShowError message={this.state.error.description} />
                </div>
              : item.description
          }
        </td>


        <td>
          {
            isInEditingState 
              ? <div>
                  <Input 
                    name="price" 
                    type="number" 
                    onChange={this.handleChange} 
                    defaultValue={item.price} 
                    onBlur={this.handleBlur}
                  />
                  <ShowError message={this.state.error.price} />
                </div>
              : item.price
          }
        </td>

        <td>
          {
            isInEditingState
            ? <ImageUpload 
                name="avatar"
                handleImageChange={this.handleImage}
                value={editedAvatarId || avatar._id}
                filename={editedAvatarFilename || avatar.filename}
                isUploading={isUploading}
            /> 
            : avatar && 
              <a target="_blank" href={`http://localhost:8000/uploads/${avatar.filename}`} rel="noopener noreferrer">
                <img alt="avatar" src={`http://localhost:8000/uploads/icon-${avatar.filename}`} />
              </a>
          }
        </td>

        <td>
          {
            isInEditingState
            ? <select name="category" onChange={this.handleChange} className="form-control">
              {categoryOptions}
            </select>
            : category.name
          }
        </td>

        <td>
          <Button label="edit" className="btn btn-success" icon={isInEditingState? '' : 'edit'} onClick={this.handleEdit} />
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

const mapDispatchToProps = {
  remove,
  toggleEditState,
  edit,
  uploadEditedItemMedia,
};

export default connect(null, mapDispatchToProps)(ItemList);