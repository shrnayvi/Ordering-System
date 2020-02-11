import React from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import GoogleLogin from 'react-google-login';

import { googleLogin } from '../actions/auth';
import keys from '../constants/keys';


export default _ => {
  const dispatch = useDispatch();

  const handleSuccess = response => {
    dispatch(googleLogin(response.accessToken))
  }

  const handleFailure = _ => {
    console.log('login failed');
  }


  return (
    <GoogleLogin
      clientId={keys.googleClientID}
      buttonText={<FormattedMessage id="login_with_google" />}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}