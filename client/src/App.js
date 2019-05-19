import React from 'react';
import { Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import history from './helpers/history';

const App = () => {
   return (
      <Container fluid={true}>
         <Router history={history}>
            <div>
               <Header />
               <Routes />
               <Footer />
            </div>
         </Router>
      </Container>
   )
};

export default App;