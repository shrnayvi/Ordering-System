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
      MYORDERS,
      CART,
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
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ isLoggedIn: auth.isLoggedIn, user: auth.user });
export default withRouter(connect(mapStateToProps, {})(Sidebar));