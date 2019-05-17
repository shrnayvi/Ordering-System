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
         email: '',
         password: ''
      };
   }

   handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const { email, password } = this.state;
      this.props.loginUser({ email, password });
   }

   render() {
      const {
         status, 
         message,
         loginFailure,
         isLogging,
      } = this.props;
      return (
         <div>
               <h2>Login</h2>
               <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Enter email" 
                        name="email"
                        required
                     />
                  </Form.Group>

                  <Form.Group controlId="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="password" 
                        placeholder="Password" 
                        name="password"
                     />
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