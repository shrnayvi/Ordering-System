import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect} from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';

import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Profile from './components/user/Profile';
import Dashboard from './components/Dashboard';
import Logout from './components/user/Logout';
import Item from './components/item/Item';
import SingleItem from './components/item/SingleItem';

class Routes extends Component {
   render() {
      const { isLoggedIn } = this.props;
      return (
         <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route exact path="/items" component={Item} />
            <Route path="/items/:slug" component={SingleItem} />
            <ProtectedRoutes isLoggedIn={isLoggedIn} path="/profile" component={Profile} />
            <ProtectedRoutes isLoggedIn={isLoggedIn} path="/dashboard" component={Dashboard} />
            <Route path="/logout" component={Logout} />
         </div>
      )

   }
};

const mapStateToProps = ({ auth }) =>  ({ isLoggedIn: auth.isLoggedIn });
export default connect(mapStateToProps)(Routes);