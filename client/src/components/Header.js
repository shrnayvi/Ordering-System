import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import Navbar from './Navbar';

class Header extends Component {
   render() {
      return (
         <Container>
            <Navbar isLoggedIn={this.props.isLoggedIn} />
         </Container>
      )
   }
}

const mapStateToProps = ({ auth }) => (auth);
export default connect(mapStateToProps)(Header);