import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { resetPassword } from '../../actions/userActions';

class ResetPassword extends Component {
   constructor(props) {
      super(props);

      this.state = {
         password: '',
         confirmPassword: '',
         token: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.resetPassword(this.state);
   }

   render() {
      return (
         <Container>
            <Row>
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
                     Submit
                  </Button>
               </Form>
            </Row>
         </Container>
      )
   }
}

const mapStateToProps = ({ resetPassword }) => resetPassword
const mapDispatchToProps = {
   resetPassword
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword); 