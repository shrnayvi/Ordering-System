import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import routes from '../../constants/routes';
import getSelector from '../../helpers/getSelector';

class Sidebar extends Component {
  render() {
    const {
      PROFILE,
      MYORDERS,
      CART,
      ITEM,
      DASHBOARD,
      LOGOUT,
    } = routes;

    const { pathname } = this.props.location;
    const { role } = this.props.user;

    return (
      <div className="sidenav">
        <ul>
          <li className={`nav-item ${getSelector('sidenav-active', DASHBOARD(role), pathname)}`}>
            <Link className="nav-link" to={DASHBOARD(role)} >
              <FormattedMessage id="dashboard" />
            </Link>
          </li>

          <li className={`sidenav-link ${getSelector('sidenav-active', PROFILE(role), pathname)}`} >
            <Link to={PROFILE(role)}>
              <FormattedMessage id="profile" />
            </Link>
          </li>

          <li className={`nav-item ${getSelector('sidenav-active', ITEM, pathname)}`}>
            <Link className="nav-link" to={ITEM}>
              <FormattedMessage id="item" />
            </Link>
          </li>

          <li className={`sidenav-link ${getSelector('sidenav-active', MYORDERS, pathname)}`} >
            <Link to={MYORDERS}>
              <FormattedMessage id="my_orders" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', CART, pathname)}`} >
            <Link to={CART}>
              <FormattedMessage id="cart" />
            </Link>
          </li>

          {
            this.props.isLoggedIn && 
              <li className="nav-item">
                <Link className="nav-link" to={LOGOUT} >
                  <FormattedMessage id="logout" />
                </Link>
              </li>
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => auth;
export default withRouter(connect(mapStateToProps, {})(Sidebar));