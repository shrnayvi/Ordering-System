import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from './Button';
import LabelInput from './LabelInput';

import { requestPasswordChange } from '../actions/user';
import { FormattedMessage } from 'react-intl';

export default _ => {
  const dispatch = useDispatch();
  const { isRequestingPasswordChange, hasRequested } = useSelector(state => state.password);

  const [email, setEmail] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(requestPasswordChange({ email }));
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