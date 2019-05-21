import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { registerUser, clearRegister } from '../../actions/userActions';
import ErrorMessage from '../validations/ErrorMessage';

const emailRequired = 'Email is required',
   passwordRequired = 'Password is required',
   nameRequired = 'Name is required',
   phoneRequired = 'Phone number is required';

class Register extends Component {
   constructor(props) {
      super(props);

      this.props.clearRegister();
      this.state = {
         formData: {
            email: '',
            password: '',
            name: '',
            phone: '',
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

      if(form.checkValidity()) {
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
               <h2>Register</h2>
               <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="email" 
                        placeholder="Enter email" 
                        name="email"
                        required
                     />

                     <ErrorMessage message={emailRequired} />
                  </Form.Group>

                  <Form.Group controlId="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        required
                     />
                     <ErrorMessage message={passwordRequired} />
                  </Form.Group>

                  <Form.Group controlId="name">
                     <Form.Label>Name</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Name" 
                        name="name"
                        required
                     />
                     <ErrorMessage message={nameRequired} />
                  </Form.Group>

                  <Form.Group controlId="phone">
                     <Form.Label>Phone Number</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="number" 
                        placeholder="Phone" 
                        name="phone"
                        required
                     />
                     <ErrorMessage message={phoneRequired} />
                  </Form.Group>

                  {
                     hasRequested && status !== 200 ?
                        <Alert variant="danger">{message}</Alert>
                        : hasRequested && status === 200 ?
                        <Alert variant="success">{message}</Alert>
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
                           /> : 'Register'
                     }
                  </Button>
                  
               </Form>
         </div>
      )
   }
}


const mapStateToProps = ({ register }) => register;
const mapDispatchToProps = { 
   registerUser,
   clearRegister,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);