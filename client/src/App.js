import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import history from './helpers/history';

const App = () => {
   return (
      <div>
         <Router history={history}>
            <div>
               <Header />
               <Routes />
               <Footer />
            </div>
         </Router>
      </div>
   )
};

export default App;