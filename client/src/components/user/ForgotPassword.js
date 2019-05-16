import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { forgotPassword } from '../../actions/userActions';
import { headerMenu } from '../../constants/menu';

class ForgotPassword extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentDidUpdate() {
      const { status } = this.props;
      if(status === 200) {
         this.props.history.push(headerMenu.RESET_PASSWORD);
      }
   }

   handleChange(e) {
      this.setState({ email: e.target.value });
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.forgotPassword(this.state);
   }

   render() {
      const { status, isRequesting, hasRequested } = this.props;
      return (
         <Container>
            <Row>
               <h2>Forgot Password</h2>
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

                  <Button variant="primary" type="submit">
                     {
                        isRequesting ?
                           <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                           /> :
                        `Forgot Password`
                     }
                  </Button>
                  {
                     hasRequested && status !== 200 ?
                        <Alert variant="danger">{this.props.message}</Alert>
                        : ''
                  }
               </Form>
            </Row>
         </Container>
      )
   }
}

const mapStateToProps = ({ forgotPassword }) => forgotPassword;
const mapDispatchToProps = {
   forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);