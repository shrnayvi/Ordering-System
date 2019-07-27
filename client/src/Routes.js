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
import CategoryItems from './components/item/CategoryItems';
import UserOrders from './components/order/UserOrders';
import Cart from './components/cart/Cart';

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
            <Route path="/categories/:id" component={CategoryItems} />
            <Route path="/orders" component={UserOrders} />
            <Route path="/cart" component={Cart} />
            <ProtectedRoutes isLoggedIn={isLoggedIn} path="/profile" component={Profile} />
            <ProtectedRoutes isLoggedIn={isLoggedIn} path="/dashboard" component={Dashboard} />
            <Route path="/logout" component={Logout} />
         </div>
      )

   }
};

const mapStateToProps = ({ auth }) =>  ({ isLoggedIn: auth.isLoggedIn });
export default connect(mapStateToProps)(Routes);