import get from 'lodash/get';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import Button from './Button';
import LabelInput from './LabelInput';
import GoogleLogin from './GoogleLogin';

import { isEmailValid, userValidation } from '../helpers/validation';
import { loginUser, verifyEmail } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        email: '',
        password: '',
      },
      error: {
        email: '',
        password: '',
      }
    }

    if(this.props.auth.isLoggedIn) {
      const role = get(this.props, 'auth.user.role');
      this.props.history.push(`${role}`);
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const query = qs.parse(this.props.location.search);
    if(query.verify) {
      this.props.verifyEmail({ token: query.verify });
    }
  }

  handleBlur = e => {
    const { name, value } = e.target;
    if(name === 'email') {
      if(isEmailValid(value)) {
        this.setState({ error: { ...this.state.error, email: '' } })
      }
    } else if(value) {
      this.setState({ error: { ...this.state.error, [name]: '' } })
    }
  }

  checkValidation = () => {
    const validation = userValidation({ user: this.state.auth });
    this.setState({ error: { ...this.state.error, ...validation.errors } });
    return validation.isFormValid;
  }

  handleChange(e) {
    this.setState({ auth: { ...this.state.auth, [e.target.name]: e.target.value } })
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.checkValidation()) {
      this.props.loginUser(this.state.auth)
    }
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <LabelInput 
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.auth.email}
            label="enter_email"
            needValidation={true}
            errorMessage={this.state.error.email}
            onBlur={this.handleBlur}
          />

          <LabelInput 
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.auth.password}
            label="password"
            needValidation={true}
            errorMessage={this.state.error.password}
            onBlur={this.handleBlur}
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
  verifyEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);