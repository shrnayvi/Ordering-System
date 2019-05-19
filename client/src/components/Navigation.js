import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeMenu, initializeMenu, removeCurrentMenu } from '../actions/menuActions';
import routes from '../constants/routes';
import getSelector from '../helpers/getSelector';

class Navigation extends Component {
   render() {
      const { 
         HOME,
         PROFILE,
         LOGIN,
         LOGOUT,
      } = routes;

      const { pathname } = this.props.location;

      return (
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav">
                  <li className={`nav-item ${getSelector('active', HOME, pathname)}`}>
                     <Link className="nav-link" to={HOME}>Home </Link>
                  </li>
                  <li className={`nav-item ${getSelector('active', PROFILE, pathname)}`}>
                     <Link className="nav-link" to={PROFILE}>Profile</Link>
                  </li>
                  {
                     this.props.isLoggedIn ? 
                        <li className="nav-item">
                           <Link className="nav-link" to={LOGOUT} >Logout</Link>
                        </li> 
                        : <li className={`nav-item ${getSelector('active', LOGIN, pathname)}`}>
                           <Link className="nav-link" to={LOGIN}>Login</Link>
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