import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import LabelInput from '../../LabelInput';
import Button from '../../Button';
import ImageUpload from '../../ImageUpload';

import { isEmailValid, userValidation } from '../../../helpers/validation';
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
        name: '',
        role: 'customer',
      },
      error: {
        email: '',
        password: '',
        name: '',
        phone: '',
      }
    }
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.ui.hasAdded &&this.props.ui.hasAdded) {
      this.setState({ user: { email: '', password: '', name: '', phone: '' } })
    }
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ user: { ...this.state.user, [name]: value } });
  }

  handleImageChange = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('attachment', file)

    this.props.uploadMedia(formData);
  }

  checkValidation = () => {
    const validation = userValidation(this.state);
    this.setState({ error: { ...this.state.error, ...validation.errors } });
    return validation.isFormValid;
  }
  
  handleSubmit = e => {
    e.preventDefault();

    const checkValidation = this.checkValidation();

    if(checkValidation) {
      const { uploaded } = this.props.media;
      const data = {
        ...this.state.user,
        avatar: uploaded._id ? uploaded._id : null
      }
      this.props.addUser(data);
    }
  }

  handleBlur = e => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'email') {
      if(isEmailValid(value)) {
        this.setState({ error: { ...this.state.error, email: '' } });
      }
    } else {
      if(value) {
        this.setState({ error: { ...this.state.error, [name]: '' } });
      }
    }
  }

  render() {
    const { isAdding, hasAdded } = this.props.ui;
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
              value={this.state.user.email}
              label="enter_email"
              needValidation={true}
              errorMessage={this.state.error.email}
              onBlur={this.handleBlur}
            />

            <LabelInput 
              name="password"
              type="password"
              handleChange={this.handleChange}
              value={this.state.user.password}
              label="password"
              needValidation={true}
              errorMessage={this.state.error.password}
              onBlur={this.handleBlur}
            />

            <LabelInput 
              name="name"
              type="text"
              handleChange={this.handleChange}
              value={this.state.user.name}
              label="name"
              needValidation={true}
              errorMessage={this.state.error.name}
              onBlur={this.handleBlur}
            />

            <LabelInput 
              name="phone"
              type="text"
              handleChange={this.handleChange}
              value={this.state.user.phone}
              label="phone"
              needValidation={true}
              errorMessage={this.state.error.phone}
              onBlur={this.handleBlur}
            />

            <ImageUpload 
              name="avatar"
              handleImageChange={this.handleImageChange}
              value={hasAdded ? '': uploadedMedia._id}
              filename={hasAdded ? '' : uploadedMedia.filename}
              isUploading={mediaUi.isUploading}
            />

            <div className="form-group mt-2">
              <label><FormattedMessage id="role" /> </label>
              <select name="role" className="form-control" onChange={this.handleChange}>
                <option value="customer">Customer</option> 
                <option value="admin">Admin</option> 
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
