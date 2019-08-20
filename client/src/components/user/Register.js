import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { registerUser, clearRegister } from '../../actions/userActions';
import ErrorMessage from '../validations/ErrorMessage';

class Register extends Component {
  constructor(props) {
    super(props);

    this.role = (this.props.auth.user || {}).role;
    if ((this.props.auth.isLoggedIn && this.role !== 'admin') || (this.props.auth.isLoggedIn && this.props.location.pathname === '/register')) {
      this.props.history.push(`/${this.role}/dashboard`);
    }
    this.props.clearRegister();
    this.state = {
      formData: {
        email: '',
        password: '',
        name: '',
        phone: '',
        status: -1,
      },
      validated: false,
    };

  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget,
      data = this.state.formData;

    if (form.checkValidity()) {
      if('status' in data) {
        data['status'] = +data.status;
      }
      this.props.registerUser(data);
    } else {
      e.stopPropagation();
    }

    this.setState({ validated: true });
  }

  render() {
    const {
      isRegistering,
      hasRequested,
      status,
      message
    } = this.props;

    const { validated } = this.state;

    return (
      <div>
        <h2>
          <FormattedMessage id={this.role === 'admin' ? 'add_user': 'register'} />
        </h2>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label><FormattedMessage id="email_address" /></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="email"
              placeholder="Enter Email"
              name="email"
              required
            />

            <ErrorMessage message={<FormattedMessage id="email_required" />} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label><FormattedMessage id="password" /></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
            <ErrorMessage message={<FormattedMessage id="password_required" />} />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label><FormattedMessage id="name" /></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              placeholder="Enter Name"
              name="name"
              required
            />
            <ErrorMessage message={<FormattedMessage id="name_required" />} />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label><FormattedMessage id="phone_number" /></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="number"
              placeholder="Phone Number"
              name="phone"
              required
            />
            <ErrorMessage message={<FormattedMessage id="phone_required" />} />
          </Form.Group>

          {
            this.role === 'admin' &&
              <Form.Group controlId="status">
                <Form.Label><FormattedMessage id="status" /></Form.Label>
                <Form.Control name="status" as="select" onChange={this.handleChange}>
                  <option value="-1">Pending</option>
                  <option value="0">Blocked</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </Form.Control>
              </Form.Group>
          }

          {
            hasRequested && status !== 200 ?
              <Alert variant="danger">{<FormattedMessage id={message} />}</Alert>
              : hasRequested && status === 200 && this.role === 'admin' ?
              <Alert variant="success">{<FormattedMessage id={'user_by_admin_add_successful'} />}</Alert>
              : hasRequested && status === 200 ?
              <Alert variant="success">{<FormattedMessage id={message} />}</Alert>
              : ''
          }

          <Button variant="primary" type="submit">
            {
              isRegistering ?
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> : <FormattedMessage id={this.role === 'admin' ? 'add' : 'register'} />
            }
          </Button>

        </Form>
        <Link to="/login">
          <FormattedMessage id="login" />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, register }) => ({ auth, ...register });
const mapDispatchToProps = {
  registerUser,
  clearRegister,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));