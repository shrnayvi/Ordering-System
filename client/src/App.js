import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Profile from './components/user/Profile';

const App = () => {
   return (
      <div>
         <BrowserRouter>
            <div>
               <Header />
               <Route exact path="/" component={Home} />
               <Route path="/login" component={Login} />
               <Route path="/register" component={Register} />
               <Route path="/forgot-password" component={ForgotPassword} />
               <Route path="/reset-password" component={ResetPassword} />
               <Route path="/profile" component={Profile} />
               <Footer />
            </div>
         </BrowserRouter>
      </div>
   )
};

export default App;