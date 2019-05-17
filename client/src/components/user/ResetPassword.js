import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { resetPassword } from '../../actions/userActions';

class ResetPassword extends Component {
   constructor(props) {
      super(props);

      this.state = {
         password: '',
         confirmPassword: '',
         token: ''
      };

   }

   handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   }

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.resetPassword(this.state);
   }

   render() {
      const { isResetting, hasRequested, status, message } = this.props;
      return (
         <div>
            <h2>Reset Password</h2>
            <Form onSubmit={this.handleSubmit}>
               <Form.Group controlId="password">
                  <Form.Label>Token</Form.Label>
                  <Form.Control 
                     onChange={this.handleChange}
                     type="text" 
                     placeholder="Token" 
                     name="token"
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

               <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control 
                     onChange={this.handleChange}
                     type="password" 
                     placeholder="Password" 
                     name="confirmPassword"
                  />
               </Form.Group>

               <Button variant="primary" type="submit">
                  {
                     isResetting ?
                        <Spinner
                           as="span"
                           animation="border"
                           size="sm"
                           role="status"
                           aria-hidden="true"
                        /> :
                     `Reset`
                  }

               </Button>
               {
                  hasRequested && status !== 200 ?
                     <Alert variant="danger">{message}</Alert>
                     : ''
               }
            </Form>
         </div>
      )
   }
}

const mapStateToProps = ({ resetPassword }) => resetPassword
const mapDispatchToProps = {
   resetPassword
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword); 