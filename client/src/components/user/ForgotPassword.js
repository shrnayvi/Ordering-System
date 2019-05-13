import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class ForgotPassword extends Component {
   render() {
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

                  <Button variant="primary" type="submit">
                     Submit
                  </Button>
               </Form>
            </Row>
         </Container>
      )
   }
}