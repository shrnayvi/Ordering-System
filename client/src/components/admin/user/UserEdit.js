import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { fetchUser, editProfile, handleEditInputChange, resetStatus } from '../../../actions/userActions';
import AdminSidebar from '../sidebar/Sidebar';
import ErrorMessage from '../../validations/ErrorMessage';

const nameRequired = 'Name is required',
  phoneRequired = 'Phone is required';

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.props.resetStatus();
    this.state = {
      validated: false,
    }
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    this.props.fetchUser(_id, 'user');
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.props.handleEditInputChange({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      const { _id } = this.props.match.params;
      this.props.editProfile(_id, { ...this.props.user.editInformation }, 'user-edit');
    } else {
      e.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const {
      email,
      name,
      username,
      phone,
      status: userStatus,
    } = this.props.user.editInformation;

    const {
      message,
      status,
      isEditing,
    } = this.props.user;

    const { validated } = this.state;
    return (
      <div>
        <AdminSidebar />
        <div className="main">
          <h3>User Information</h3>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                name="email"
                defaultValue={email}
                onChange={this.handleChange}
                required
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={name}
                onChange={this.handleChange}
                required
              />
              <ErrorMessage message={nameRequired} />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                name="username"
                defaultValue={username}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone Number"
                name="phone"
                defaultValue={phone}
                onChange={this.handleChange}
                required
              />
              <ErrorMessage message={phoneRequired} />
            </Form.Group>

              {
                typeof userStatus !== 'undefined' &&
                  <Form.Group controlId="status">
                    <Form.Label><FormattedMessage id="status" /></Form.Label>
                    <Form.Control name="status" as="select" onChange={this.handleChange} defaultValue={userStatus} >
                      <option value="-1">Pending</option>
                      <option value="0" >Blocked</option>
                      <option value="1">Active</option>
                      <option value="-2">Inactive</option>
                    </Form.Control>
                  </Form.Group>
              }

            {
              message ?
                <Alert variant={status === 200 ? 'success' : 'danger'}>
                  <FormattedMessage id={message} />
                </Alert>
                : null
            }

            <Button variant="primary" type="submit">
              {
                isEditing ?
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : 'Update'
              }
            </Button>
          </Form>

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({ auth, user });
const mapDispatchToProps = {
  fetchUser,
  editProfile,
  handleEditInputChange,
  resetStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);