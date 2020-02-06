import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import routes from '../../constants/routes';
import getSelector from '../../helpers/getSelector';

class Sidebar extends Component {
  render() {
    const {
      DASHBOARD,
      LOGOUT,
      PROFILE,
      ALL_USERS,
      NEW_USER,
      ALL_CATEGORIES,
      ALL_ORDERS,
      ALL_ITEMS,
      ALL_EVENTS,
    } = routes;

    const { pathname } = this.props.location;
    const { role } = this.props.user;

    return (
      <div className="sidenav">
        <ul>
          <li className={`sidenav-link ${getSelector('sidenav-active', DASHBOARD(role), pathname)}`} >
            <Link to={DASHBOARD(role)}>
              <FormattedMessage id="dashboard" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', PROFILE(role), pathname)}`} >
            <Link to={PROFILE(role)}>
              <FormattedMessage id="profile" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', ALL_USERS, pathname)}`} >
            <Link to={ALL_USERS}>
              <FormattedMessage id="all_users" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', NEW_USER, pathname)}`} >
            <Link to={NEW_USER}>
              <FormattedMessage id="new_user" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', ALL_CATEGORIES, pathname)}`} >
            <Link to={ALL_CATEGORIES}>
              <FormattedMessage id="categories" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', ALL_EVENTS, pathname)}`} >
            <Link to={ALL_EVENTS}>
              <FormattedMessage id="events" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', ALL_ORDERS, pathname)}`} >
            <Link to={ALL_ORDERS}>
              <FormattedMessage id="orders" />
            </Link>
          </li>
          <li className={`sidenav-link ${getSelector('sidenav-active', ALL_ITEMS, pathname)}`} >
            <Link to={ALL_ITEMS}>
              <FormattedMessage id="items" />
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

const mapStateToProps = ({ auth }) => ({ isLoggedIn: auth.isLoggedIn, user: auth.user });
export default withRouter(connect(mapStateToProps, {})(Sidebar));