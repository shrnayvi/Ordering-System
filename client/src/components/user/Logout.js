import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';

class Logout extends Component {
   constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick() {
      this.props.logoutUser();
   }
   
   render() {
      return (
         <div>
            <button onClick={this.handleClick}>Logout</button> 
         </div>
      )
   }
}


const mapStateToProps = ({ auth }) => ( auth );
const mapDispatchToProps = {
   logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);