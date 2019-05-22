import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { registerUser, clearRegister } from '../../actions/userActions';
import ErrorMessage from '../validations/ErrorMessage';

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
               <h2><FormattedMessage id="register" /></h2>
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
                     hasRequested && status !== 200 ?
                        <Alert variant="danger">{<FormattedMessage id={message} />}</Alert>
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
                           /> : <FormattedMessage id="register" />
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