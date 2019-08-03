import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import routes from '../../../constants/routes';
import getSelector from '../../../helpers/getSelector';

class Sidebar extends Component {
  render() {
    const {
      PROFILE,
      ALL_USERS,
      NEW_USER,
    } = routes;

    const { pathname } = this.props.location;
    const { role } = this.props.user;

    return (
      <div className="sidenav">
        <ul>
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
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ isLoggedIn: auth.isLoggedIn, user: auth.user });
export default withRouter(connect(mapStateToProps, {})(Sidebar));