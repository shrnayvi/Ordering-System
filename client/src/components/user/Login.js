import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import qs from 'querystring';
import { loginUser, emailVerification } from '../../actions/userActions';
import routes from '../../constants/routes';
import ErrorMessage from '../validations/ErrorMessage';
import Google from './GoogleLogin';

const emailRequired = 'Email is required',
   passwordRequired = 'Password is required';

class Login extends Component {
   constructor(props) {
      super(props);
      this.checkEmailVerification();

      this.state = {
         formData: {
            email: '',
            password: ''
         },
         validated: false,
      };
   }

   checkEmailVerification() {
      const queryParameter = this.props.location.search;
      let query = {};
      if(queryParameter) {
         query = qs.parse(queryParameter.split("?")[1]);
      }

      let { emailVerification, emailVerificationMessage } = this.props;
      if(emailVerificationMessage){
         emailVerification('clear');
      }
      
      if('verification' in query) {
         this.emailVerificationStatus = query.verification;
         switch(query.verification) {
            case 'success':
               emailVerification('success');
               break;
            case 'error':
               emailVerification('error');
               break;
            default: 
               emailVerification('clear');
               break;
         }
      }


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
         emailVerificationMessage,
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

                  {
                     loginFailure && status !== 200 ?
                        <Alert variant="danger">{message}</Alert>
                        : ''
                  }

                  {
                     emailVerificationMessage ? 
                        <Alert variant={this.emailVerificationStatus}>{emailVerificationMessage}</Alert>
                        : ''
                  }

                  <div>
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
                  </div>
                  <div>
                     <Link to={routes.REGISTER}>Register</Link> &nbsp;
                     <Link to={routes.FORGOT_PASSWORD}>Forgot Password</Link>
                  </div>
                  <div>
                     <Google />
                  </div>

               </Form>
         </div>
      )
   }
}

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = { 
   loginUser,
   emailVerification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);