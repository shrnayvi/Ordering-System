import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeMenu, initializeMenu, removeCurrentMenu } from '../actions/menuActions';
import routes from '../constants/routes';

class Navbar extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }

   componentWillMount() {
      const { pathname } = this.props.location;
      this.props.initializeMenu({
         [pathname]: 'active'
      });
   }

   componentDidUpdate() {
      const { pathname } = this.props.location;
      const { currentMenu } = this.props.menu
      let menu = Object.keys(currentMenu);

      if(menu.length) {
         menu = menu[0];
         if(pathname !== menu) {
            this.props.removeCurrentMenu();
         }
      }
   }

   handleClick(e) {
      const menu = e.target.getAttribute('href');
      this.props.changeMenu({
         [menu]: 'active'
      })
   }

   render() {
      const { 
         HOME,
         PROFILE,
         LOGIN,
         LOGOUT,
      } = routes;

      const { currentMenu } = this.props.menu;

      return (
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav">
                  <li className={`nav-item ${currentMenu[HOME]}`}>
                     <Link className="nav-link" to={HOME} onClick={this.handleClick}>Home </Link>
                  </li>
                  <li className={`nav-item ${currentMenu[PROFILE]}`}>
                     <Link className="nav-link" to={PROFILE} onClick={this.handleClick}>Profile</Link>
                  </li>
                  {
                     this.props.isLoggedIn ? 
                        <li className={`nav-item ${currentMenu[LOGIN]}`}>
                           <Link className="nav-link" to={LOGOUT}>Logout</Link>
                        </li> 
                        : <li className={`nav-item ${currentMenu[LOGIN]}`}>
                           <Link className="nav-link" to={LOGIN} onClick={this.handleClick}>Login</Link>
                        </li> 
                  }
               </ul>
            </div>
         </nav>
      );

   }
}

const mapStateToProps = ({ menu, auth }) => ({ menu, isLoggedIn: auth.isLoggedIn });
const mapDispatchToProps = {
   changeMenu,
   initializeMenu,
   removeCurrentMenu,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));