import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../../actions/userActions';
import { headerMenu } from '../../constants/menu';

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

   componentDidUpdate() {
      const {
         isLoggedIn
      } = this.props;
      const { history } = this.props;
      if(isLoggedIn) {
         history.push('/dashboard');
      }
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

                  <Row>
                     <Button variant="primary" type="submit">
                        Submit
                     </Button>
                     <Link to={headerMenu.REGISTER}>Register</Link>
                     <Link to={headerMenu.FORGOT_PASSWORD}>Forgot Password</Link>
                  </Row>

               </Form>
            </Row>
         </Container>
      )
   }
}

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);