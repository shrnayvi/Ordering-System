import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import LabelInput from '../../LabelInput';
import Button from '../../Button';
import ImageUpload from '../../ImageUpload';
import { addUser } from '../../../actions/user';

class AddUser extends Component { 
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      phone: '',
      status: 0,
      role: 'customer',
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.addUser(this.state);
  }

  handleChange = e => {
    const name = e.target.name;
    const value = name === 'status' ? +e.target.value : e.target.value;
    this.setState({ ...this.state, [name]: value });
  }

  render() {
    const { isAdding } = this.props.ui;
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
              defaultValue={this.state.email}
              label="enter_email"
            />

            <LabelInput 
              name="password"
              type="password"
              handleChange={this.handleChange}
              defaultValue={this.state.password}
              label="password"
            />

            <LabelInput 
              name="name"
              type="text"
              handleChange={this.handleChange}
              defaultValue={this.state.name}
              label="name"
            />

            <LabelInput 
              name="phone"
              type="text"
              handleChange={this.handleChange}
              defaultValue={this.state.phone}
              label="phone"
            />

            <ImageUpload />

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

const mapStateToProps = ({ users }) => ({ ui: users.ui });
const mapDispatchToProps = {
  addUser
};


export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
