import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { fetchUser, editUser, handleInputChange } from '../../actions/userActions';
import ErrorMessage from '../validations/ErrorMessage';

const emailRequired = 'Email is required',
   nameRequired = 'Name is required',
   phoneRequired = 'Phone is required',
   usernameRequired = 'Username is required';

class Profile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         validated: false,
      }
   }
   componentDidMount() {
      const { user: { _id } } = this.props.auth;
      this.props.fetchUser(_id);
   }
   
   handleChange = (e) => {
      const { name, value } = e.target
      this.props.handleInputChange({ [name]: value })
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;

      if(form.checkValidity()) {
         const { user: { _id } } = this.props.auth;
         this.props.editUser(_id, { ...this.props.user.information });
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
      } = this.props.user.information;

      const { 
         message, 
         status,
         isEditing,
      } = this.props.user;

      const{ validated } = this.state;
      return (
         <div>
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
                  />
                  <ErrorMessage message={emailRequired} />
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
                  <ErrorMessage message={usernameRequired} />
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
                     message ? 
                        <Alert variant={status === 200 ? 'success': 'danger'}>{message}</Alert>
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
      )
   }
}

const mapStateToProps = ({ auth, user }) => ({ auth, user });
const mapDispatchToProps = { 
   fetchUser, 
   editUser, 
   handleInputChange 
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);