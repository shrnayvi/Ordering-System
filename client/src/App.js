import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

const App = (props) => {
   return (
      <div>
         <BrowserRouter>
            <div>
               <Header />
               <Routes />
               <Footer />
            </div>
         </BrowserRouter>
      </div>
   )
};

export default App;