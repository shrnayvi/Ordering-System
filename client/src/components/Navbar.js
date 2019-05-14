import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './user/Logout';

export default (props) => {
   console.log(props);
   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
               <li className="nav-item active">
                  <Link className="nav-link" to="/">Home </Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
               </li>
               {
                  props.isLoggedIn ? 
                     <li>
                        <Logout />
                     </li> : 
                     <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                     </li> 
               }
            </ul>
         </div>
         </nav>
   );
}