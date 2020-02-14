import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import LabelInput from './LabelInput';

import { requestPasswordChange } from '../actions/user';
import { isEmailValid } from '../helpers/validation';

export default _ => {
  const dispatch = useDispatch();
  const { isRequestingPasswordChange, hasRequested } = useSelector(state => state.password);

  const [email, setEmail] = useState('')
  const [error, setError] = useState({ email: '' });

  const handleBlur = e => {
    if(isEmailValid(e.target.value)) {
      setError({ email: '' });
    }
  }

  const checkValidation = _ => {
    if(!isEmailValid(email)) {
      setError({ email: 'email_required' });
      return false;
    }

    return true;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(checkValidation()) {
      dispatch(requestPasswordChange({ email }));
    }
  }

  useEffect(() => {
    if(hasRequested) {
      setEmail('');
    }
  }, [hasRequested]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <LabelInput 
          name="email"
          type="email"
          handleChange={e => setEmail(e.target.value)}
          value={email}
          label="email"
          needValidation={true}
          errorMessage={error.email} 
          onBlur={handleBlur}
        />

        <Button label="forgot_password" type="submit" className="btn btn-primary" isLoading={isRequestingPasswordChange} />

        <div className="mt-2">
          <p>
            <Link to="/"> <FormattedMessage id="login" /> </Link>
          </p>
        </div>

        
        <ToastContainer autoClose={2000} />

      </form>

    </React.Fragment>
  )
}