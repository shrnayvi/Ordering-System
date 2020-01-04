import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import capabilities from '../constants/capabilities';

export default ({ component: Component, isLoggedIn, role, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={(props) => (
        isLoggedIn && capabilities[rest.path].includes(role)
          ? <Component {...props} />
          : isLoggedIn && !capabilities[rest.path].includes(role)
          ? <Redirect to={`/${role}`} />
          : <Redirect to="/" />
      )}
    />
  )
}