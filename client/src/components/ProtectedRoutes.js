import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({ component: Component, isLoggedIn, ...rest }) => (
   <Route 
      {...rest} 
      render={ 
         (props) => (
            isLoggedIn 
               ? <Component {...props} /> 
               : <Redirect to="/login" />
         )
         
      } 
   />
);

export default ProtectedRoutes;