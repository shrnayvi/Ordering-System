import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import LabelInput from '../../LabelInput';
import Button from '../../Button';
import ImageUpload from '../../ImageUpload';
import { addUser } from '../../../actions/user';
import { uploadMedia, clearUploadedMedia } from '../../../actions/media';

import '../../../assets/add-user.css';

class AddUser extends Component { 
  constructor() {
    super();
    this.state = {
      user: {
        email: '',
        password: '',
        phone: '',
        status: 0,
        role: 'customer',
      },
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { uploaded } = this.props.media;
    const data = {
      ...this.state.user,
      avatar: uploaded._id ? uploaded._id : null
    }
    this.props.addUser(data);
  }

  handleChange = e => {
    const name = e.target.name;
    const value = name === 'status' ? +e.target.value : e.target.value;
    this.setState({ user: { ...this.state.user, [name]: value } });
  }

  handleImageChange = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('attachment', file)

    this.props.uploadMedia(formData);
  }

  render() {
    const { isAdding } = this.props.ui;
    const { ui: mediaUi, uploaded: uploadedMedia } = this.props.media;

    return (
      <React.Fragment>
        <Sidebar />
          <div className="main">
            <h1>
              <FormattedMessage id="add_user" />
            </h1>

          <form onSubmit={this.handleSubmit}>
            <LabelInput 
              name="email"
              type="email"
              handleChange={this.handleChange}
              value={this.state.email}
              label="enter_email"
            />

            <LabelInput 
              name="password"
              type="password"
              handleChange={this.handleChange}
              value={this.state.password}
              label="password"
            />

            <LabelInput 
              name="name"
              type="text"
              handleChange={this.handleChange}
              value={this.state.name}
              label="name"
            />

            <LabelInput 
              name="phone"
              type="text"
              handleChange={this.handleChange}
              value={this.state.phone}
              label="phone"
            />

            <ImageUpload 
              name="avatar"
              handleImageChange={this.handleImageChange}
              value={uploadedMedia._id}
              filename={uploadedMedia.filename}
              isUploading={mediaUi.isUploading}
            />

            <div className="form-group">
              <select name="role" onChange={this.handleChange}>
                <option value="customer">Customer</option> 
                <option value="admin">Admin</option> 
              </select>
            </div>

            <div className="form-group">
              <select name="status" onChange={this.handleChange} >
                <option value="0">Pending</option> 
                <option value="1">Active</option> 
              </select>
            </div>

            <Button label="submit" type="submit" className="btn btn-primary" isLoading={isAdding} />

            <ToastContainer />

          </form>
        </div>
      </React.Fragment>

    )
  }
}

const mapStateToProps = ({ users, media }) => ({ ui: users.ui, media });
const mapDispatchToProps = {
  addUser,
  uploadMedia,
  clearUploadedMedia,
};


export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
