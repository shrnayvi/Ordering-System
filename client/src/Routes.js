import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
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
import UserOrders from './components/customer/order/UserOrders';
import Cart from './components/customer/cart/Cart';

import Users from './components/admin/user/Users';
import NewUser from './components/admin/user/NewUser';
import UserEdit from './components/admin/user/UserEdit';
import NewCategory from './components/admin/category/NewCategory';
import EditCategory from './components/admin/category/EditCategory';
import Categories from './components/admin/category/Categories';
import Orders from './components/admin/order/Orders';
import Items from './components/admin/item/Items';
import EditItem from './components/admin/item/EditItem';
import NewItem from './components/admin/item/NewItem';
import AdminDashboard from './components/admin/Dashboard';



class Routes extends Component {
  render() {
    const { isLoggedIn, role } = this.props;
    return (
      <div>
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} exact path="/" component={Home} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/logout" component={Logout} />

        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/items" component={Item}  exact />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/items/:slug" component={SingleItem} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/categories/:slug" component={CategoryItems}  />

        {/* Customer Routes */}
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/customer/my-orders" component={UserOrders} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/customer/cart" component={Cart} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/customer/profile" component={Profile} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/customer/dashboard" component={Dashboard} />

        {/* Admin Routes */}
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/profile" component={Profile} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/dashboard" component={AdminDashboard} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/users" component={Users} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/new-user" component={NewUser} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/edit-user/:_id" component={UserEdit} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/new-category" component={NewCategory} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/categories" component={Categories} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/edit-category/:slug" component={EditCategory} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/orders" component={Orders} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/items" component={Items} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/edit-item/:slug" component={EditItem} />
        <ProtectedRoutes isLoggedIn={isLoggedIn} role={role} path="/admin/new-item" component={NewItem} />
      </div>
    )

  }
};

const mapStateToProps = ({ auth }) => ({ isLoggedIn: auth.isLoggedIn, role: auth.user ? auth.user.role : null });
export default connect(mapStateToProps)(Routes);