import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';
import Input from './Input';
import LabelInput from './LabelInput';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
            label="Email"
          />

          <LabelInput 
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.email}
            label="Password"
          />

          <Input type="submit" className="btn btn-primary" />

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