import get from 'lodash/get';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Button from './Button';
import LabelInput from './LabelInput';
import GoogleLogin from './GoogleLogin';

import { loginUser } from '../actions/auth';

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

          <Button label="login" type="submit" className="btn btn-primary" />

           <div className="mt-2">
             <p>
              <Link to="/forgot-password">
                <FormattedMessage id="forgot_password" />
              </Link>
             </p>
          </div>

           <div className="mt-2">
             <p>
              <FormattedMessage id="sign_up" />:
              <Link to="/register">
                <FormattedMessage id="register" />
              </Link>
             </p>
          </div>
          <GoogleLogin />
          
          <ToastContainer autoClose={1000} />

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