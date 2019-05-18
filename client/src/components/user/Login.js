import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { loginUser } from '../../actions/userActions';
import routes from '../../constants/routes';

class Login extends Component {
   constructor(props) {
      super(props);

      this.state = {
         formData: {
            email: '',
            password: ''
         },
         validated: false,
      };
   }

   handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ formData: { ...this.state.formData, [name]: value } }); 
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const { formData: { email, password } } = this.state;

      if(form.checkValidity()) {
         this.props.loginUser({ email, password });
      } else {
         e.stopPropagation();
      }

      this.setState({ validated: true });
   }

   render() {
      const {
         status, 
         message,
         loginFailure,
         isLogging,
      } = this.props;

      const { validated } = this.state;
      return (
         <div>
               <h2>Login</h2>
               <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Enter email" 
                        name="email"
                        required
                     />
                     <Form.Control.Feedback type="invalid">
                        Please provide email
                     </Form.Control.Feedback>
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
                     <Form.Control.Feedback type="invalid">
                        Please provide password 
                     </Form.Control.Feedback>
                  </Form.Group>

                  {
                     loginFailure && status !== 200 ?
                        <Alert variant="danger">{message}</Alert>
                        : ''
                  }

                  <Button variant="primary" type="submit">
                     {
                        isLogging ?
                        <Spinner
                           as="span"
                           animation="border"
                           size="sm"
                           role="status"
                           aria-hidden="true"
                        /> : `Login`

                     }
                  </Button>
                  <Link to={routes.REGISTER}>Register</Link>
                  <Link to={routes.FORGOT_PASSWORD}>Forgot Password</Link>

               </Form>
         </div>
      )
   }
}

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);