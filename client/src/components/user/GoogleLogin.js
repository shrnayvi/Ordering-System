import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle } from '../../actions/userActions';
import keys from '../../constants/keys';
 
 
class Google extends Component {
   handleSuccess= (response) =>{
      this.props.loginWithGoogle(response.accessToken)
   }

   handleFailure = () => {

   }

   render() {
      return (
         <GoogleLogin
            clientId={keys.googleClientID}
            buttonText="Login With Google"
            onSuccess={this.handleSuccess}
            onFailure={this.handleFailure}
            cookiePolicy={'single_host_origin'}
         />
      )

   }
}

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = {
   loginWithGoogle,
}
export default connect(mapStateToProps, mapDispatchToProps)(Google);