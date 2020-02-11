import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from './Button';
import LabelInput from './LabelInput';

import { resetUserPassword } from '../actions/user';
import { FormattedMessage } from 'react-intl';

export default _ => {
  const dispatch = useDispatch();
  const { isResetting, hasReset } = useSelector(state => state.password);

  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetUserPassword({ token, password, confirmPassword }));
  };

  useEffect(() => {
    if(hasReset) {
      setToken('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [hasReset]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <LabelInput 
          name="token"
          type="text"
          handleChange={e => setToken(e.target.value)}
          value={token}
          label="token"
        />

        <LabelInput 
          name="password"
          type="password"
          handleChange={e => setPassword(e.target.value)}
          value={password}
          label="password"
        />

        <LabelInput 
          name="confirmPassword"
          type="password"
          handleChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          label="confirm_password"
        />

        <Button label="reset" type="submit" className="btn btn-primary" isLoading={isResetting} />

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