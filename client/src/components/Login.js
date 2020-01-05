import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';
import Input from './Input';
import LabelInput from './LabelInput';
import get from 'lodash/get';
import { ToastContainer } from 'react-toastify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }

    if(this.props.auth.isLoggedIn) {
      const role = get(this.props, 'auth.user.role');
      this.props.history.push(`${role}`);
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state)
  }

  render() {
    return (
      <React.Fragment>
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

          <Input type="submit" className="btn btn-primary" />
          
          <ToastContainer autoClose={3000} />

        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = {
  loginUser, 
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);