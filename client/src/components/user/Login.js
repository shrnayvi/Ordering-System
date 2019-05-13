import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../../actions/userActions';

class Login extends Component {
   constructor(props) {
      super(props);

      this.state = {
         email: '',
         password: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   }

   async handleSubmit(e) {
      e.preventDefault();
      const { email, password } = this.state;
      this.props.loginUser({ email, password });
   }

   render() {
      const {
         // isLogging,
         isLoggedIn
      } = this.props;
      const { history } = this.props;
      if(isLoggedIn) {
         history.push('/dashboard');
      }

      return (
         <Container>
            <Row>
               <h2>Login</h2>
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

                  <Button variant="primary" type="submit">
                     Submit
                  </Button>
               </Form>
            </Row>
         </Container>
      )
   }
}

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);