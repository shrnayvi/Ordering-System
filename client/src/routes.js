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
import Logout from './components/user/Logout';

class Routes extends Component {
   render() {
      console.log(this.props);
      return (
         <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <ProtectedRoutes component={Profile} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route path="/logout" component={Logout} />
         </div>
      )

   }
};

const mapStateToProps = ({ isLoggedIn }) =>  ({ isLoggedIn });
export default connect(mapStateToProps)(Routes);