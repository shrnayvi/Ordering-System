import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { headerMenu } from '../../constants/menu';

class Logout extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }

   componentDidUpdate() {
      console.log('hello');
      if(!this.props.isLoggedIn) {
         this.props.history.push(headerMenu.LOGIN)
      }
   }

   componentWillUpdate() {
      console.log('will');
      if(!this.props.isLoggedIn) {
         this.props.history.push(headerMenu.LOGIN)
      }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));