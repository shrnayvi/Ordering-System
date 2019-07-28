import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import includes from 'lodash/includes';
import capabilities from '../constants/capabilities';

const ProtectedRoutes = ({ component: Component, isLoggedIn, role, ...rest }) => {
  const { path  } = rest;

  return (
    <Route
      {...rest}
      render={
        (props) => (
          !isLoggedIn 
            ? <Redirect to="/login" />
            : isLoggedIn && includes(capabilities[path], role)
            ? <Component {...props} />
            : <Redirect to={`/${role}/dashboard`} />
        )

      }
    />
  )
}

export default ProtectedRoutes;