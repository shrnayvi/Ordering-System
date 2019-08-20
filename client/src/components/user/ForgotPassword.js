import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../actions/userActions';
import ErrorMessage from '../validations/ErrorMessage';

const emailRequired = 'Email Required';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validated: false,
    }
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      const { email } = this.state;
      this.props.forgotPassword({ email });
    } else {
      e.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { status, isRequesting, hasRequested } = this.props;
    const { validated } = this.state;
    return (
      <div>
        <h2><FormattedMessage id="forgot_password" /></h2>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label><FormattedMessage id="email_address" /></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
            <ErrorMessage message={emailRequired} />
          </Form.Group>

          <Button variant="primary" type="submit">
            {
              isRequesting ?
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> :
                <FormattedMessage id="forgot_password" />
            }
          </Button>
          {
            hasRequested && status !== 200 ?
              <Alert variant="danger">{this.props.message}</Alert>
              : ''
          }
        </Form>
        <Link to="/login">
          <FormattedMessage id="login" />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ forgotPassword }) => forgotPassword;
const mapDispatchToProps = {
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);