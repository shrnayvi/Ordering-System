import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as userActions from '../../actions/userActions';

class Profile extends Component {
   render() {
      return (
         <Container>
            <Row>
               <h3>User Information</h3>
               <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control 
                        type="email" 
                        placeholder="email" 
                        name="email"
                     />
                  </Form.Group>

                  <Form.Group controlId="name">
                     <Form.Label>Name</Form.Label>
                     <Form.Control 
                        type="text" 
                        placeholder="Name" 
                        name="name"
                     />
                  </Form.Group>

                  <Form.Group controlId="role">
                     <Form.Label>Role</Form.Label>
                     <Form.Control 
                        type="text" 
                        placeholder="Role" 
                        name="role"
                     />
                  </Form.Group>

                  <Form.Group controlId="username">
                     <Form.Label>Username</Form.Label>
                     <Form.Control 
                        type="username" 
                        placeholder="Username" 
                        name="username"
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

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, userActions)(Profile);