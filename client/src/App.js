import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import NotFound from './components/NotFound';

export default () => {
  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}