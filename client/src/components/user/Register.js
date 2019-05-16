import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions';

class Register extends Component {
   constructor(props) {
      super(props);

      this.state = {
         formData: {
            email: '',
            password: '',
            name: '',
            phone: '',
         }
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
      const { name, value } = e.target;
      this.setState({
         formData: { ...this.state.formData, [name]: value }
      });
   }

   handleSubmit(e) {
      e.preventDefault();
      const data = this.state.formData;
      this.props.registerUser(data);
   }

   render() {
      const { 
         isRegistering, 
         hasRequested, 
         status, 
         message 
      } = this.props;

      return (
         <Container>
            <Row>
               <h2>Register</h2>
               <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="email" 
                        placeholder="Enter email" 
                        name="email"
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

                  <Form.Group controlId="name">
                     <Form.Label>Name</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Name" 
                        name="name"
                     />
                  </Form.Group>

                  <Form.Group controlId="phone">
                     <Form.Label>Phone Number</Form.Label>
                     <Form.Control 
                        onChange={this.handleChange}
                        type="number" 
                        placeholder="Phone" 
                        name="phone"
                     />
                  </Form.Group>

                  {
                     hasRequested && status !== 200 ?
                        <Alert variant="danger">{message}</Alert>
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
            </Row>
         </Container>
      )
   }
}


const mapStateToProps = ({ register }) => register;
const mapDispatchToProps = { registerUser };
export default connect(mapStateToProps, mapDispatchToProps)(Register);