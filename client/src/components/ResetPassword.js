import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import LabelInput from './LabelInput';

import { commonValidation } from '../helpers/validation';
import { resetUserPassword } from '../actions/user';

export default _ => {
  const dispatch = useDispatch();
  const { isResetting, hasReset } = useSelector(state => state.password);

  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({ token: '', password: '', confirmPassword: '' });

  const checkValidation = _ => {
    const valObj = commonValidation({ inputs: { token, password, confirmPassword } });
    setError({ ...error, ...valObj.errors });
    if(password !== confirmPassword) {
      setError({ ...error, confirmPassword: 'confirm_password_not_match' });
      return false;
    } 

    return valObj.isFormValid;
  }

  const handleBlur = e => {
    if(e.target.value) {
      setError({ ...error, [e.target.name]: '' });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(checkValidation()) {
      dispatch(resetUserPassword({ token, password, confirmPassword }));
    }
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
          needValidation={true}
          errorMessage={error.token}
          onBlur={handleBlur}
        />

        <LabelInput 
          name="password"
          type="password"
          handleChange={e => setPassword(e.target.value)}
          value={password}
          label="password"
          needValidation={true}
          errorMessage={error.password}
          onBlur={handleBlur}
        />

        <LabelInput 
          name="confirmPassword"
          type="password"
          handleChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          label="confirm_password"
          needValidation={true}
          errorMessage={error.confirmPassword}
          onBlur={handleBlur}
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