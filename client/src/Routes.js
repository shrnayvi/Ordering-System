import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import history from './helpers/history';

import ProtectedRoutes from './components/ProtectedRoutes';

import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Customer/Dashboard';
import Items from './components/Customer/item/Items';
import SingleItem from './components/Customer/item/SingleItem';
import CustomerOrders from './components/Customer/order/Orders';
import Cart from './components/Customer/cart/Cart';
import Profile from './components/Customer/Profile';

import AdminDashboard from './components/Admin/Dashboard';
import Users from './components/Admin/users/Users';
import AdminProfile from './components/Admin/Profile';
import AddUser from './components/Admin/users/AddUser';
import Categories from './components/Admin/category/Categories';
import AdminItems from './components/Admin/item/Items';
import Orders from './components/Admin/order/Orders';
import OrderDetail from './components/common/orderDetail/OrderDetail';
import Events from './components/Admin/events/Events';


import NotFound from './components/NotFound';


class Routes extends Component {
  render() {
    const { user, isLoggedIn } = this.props;
    const role = user ? user.role : null;
    return (
      <Router history={history}>
        <div className="container-fluid">
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/logout" component={Logout} />

            <Route path="/items" component={Items} exact />
            <Route path="/items/:_id" component={SingleItem} />

            <ProtectedRoutes path="/customer" isLoggedIn={isLoggedIn} role={role} component={Dashboard} exact />
            <ProtectedRoutes path="/customer/my-orders" isLoggedIn={isLoggedIn} role={role} component={CustomerOrders} />
            <ProtectedRoutes path="/customer/cart" isLoggedIn={isLoggedIn} role={role} component={Cart} />
            <ProtectedRoutes path="/customer/profile" isLoggedIn={isLoggedIn} role={role} component={Profile} />
            <ProtectedRoutes path="/customer/order-detail/:orderId" isLoggedIn={isLoggedIn} role={role} component={OrderDetail} />
            
            <ProtectedRoutes path="/admin" isLoggedIn={isLoggedIn} role={role} component={AdminDashboard} exact />
            <ProtectedRoutes path="/admin/profile" isLoggedIn={isLoggedIn} role={role} component={AdminProfile} />
            <ProtectedRoutes path="/admin/users" isLoggedIn={isLoggedIn} role={role} component={Users} exact />
            <ProtectedRoutes path="/admin/users/add" isLoggedIn={isLoggedIn} role={role} component={AddUser} />
            <ProtectedRoutes path="/admin/categories" isLoggedIn={isLoggedIn} role={role} component={Categories} />
            <ProtectedRoutes path="/admin/orders" isLoggedIn={isLoggedIn} role={role} component={Orders} exact />
            <ProtectedRoutes path="/admin/orders/detail/:orderId" isLoggedIn={isLoggedIn} role={role} component={OrderDetail} />
            <ProtectedRoutes path="/admin/items" isLoggedIn={isLoggedIn} role={role} component={AdminItems} />
            <ProtectedRoutes path="/admin/events" isLoggedIn={isLoggedIn} role={role} component={Events} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )

  }
}

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps, null)(Routes);