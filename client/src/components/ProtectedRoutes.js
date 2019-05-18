import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import history from '../helpers/history';

const ProtectedRoutes = ({ component: Component, isLoggedIn, ...rest }) => (
   <Route 
      {...rest} 
      render={ 
         (props) => (
            true 
               ? <Component /> 
               : <Redirect to="/login" />
         )
         
      } 
   />
);

export default ProtectedRoutes;