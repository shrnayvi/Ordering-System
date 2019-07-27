import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { changeMenu, initializeMenu, removeCurrentMenu } from '../actions/menuActions';
import routes from '../constants/routes';
import getSelector from '../helpers/getSelector';

class Navigation extends Component {
  render() {
    const {
      HOME,
      PROFILE,
      DASHBOARD,
      ITEM,
      LOGIN,
      LOGOUT,
      ORDERS,
      CART,
    } = routes;

    const { pathname } = this.props.location;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className={`nav-item ${getSelector('active', HOME, pathname)}`}>
              <Link className="nav-link" to={HOME}>
                <FormattedMessage id="home" />
              </Link>
            </li>
            <li className={`nav-item ${getSelector('active', PROFILE, pathname)}`}>
              <Link className="nav-link" to={PROFILE}>
                <FormattedMessage id="profile" />
              </Link>
            </li>
            <li className={`nav-item ${getSelector('active', DASHBOARD, pathname)}`}>
              <Link className="nav-link" to={DASHBOARD}>
                <FormattedMessage id="dashboard" />
              </Link>
            </li>
            <li className={`nav-item ${getSelector('active', ITEM, pathname)}`}>
              <Link className="nav-link" to={ITEM}>
                <FormattedMessage id="item" />
              </Link>
            </li>
            <li className={`nav-item ${getSelector('active', ORDERS, pathname)}`}>
              <Link className="nav-link" to={ORDERS}>
                <FormattedMessage id="my_orders" />
              </Link>
            </li>
            <li className={`nav-item ${getSelector('active', CART, pathname)}`}>
              <Link className="nav-link" to={CART}>
                <FormattedMessage id="cart" />
              </Link>
            </li>
            {
              this.props.isLoggedIn ?
                <li className="nav-item">
                  <Link className="nav-link" to={LOGOUT} >
                    <FormattedMessage id="logout" />
                  </Link>
                </li>
                : <li className={`nav-item ${getSelector('active', LOGIN, pathname)}`}>
                  <Link className="nav-link" to={LOGIN}>
                    <FormattedMessage id="login" />
                  </Link>
                </li>
            }
          </ul>
        </div>
      </nav>
    );

  }
}

const mapStateToProps = ({ menu, auth }) => ({ menu, isLoggedIn: auth.isLoggedIn, user: auth.user });
const mapDispatchToProps = {
  changeMenu,
  initializeMenu,
  removeCurrentMenu,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));