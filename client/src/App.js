import React from 'react';
import { Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { IntlProvider } from 'react-intl';

import Routes from './Routes';
import Footer from './components/Footer';
import history from './helpers/history';
import EN_locale from './locales/en';

import './assets/main.css';
import './assets/pagination.css';

const App = () => {
  return (
    <IntlProvider locale="en" messages={EN_locale}>
      <Container fluid={true}>
        <Router history={history}>
          <div>
            {/* <Header /> */}
            <Routes />
            <Footer />
          </div>
        </Router>
      </Container>
    </IntlProvider>
  )
};

export default App;