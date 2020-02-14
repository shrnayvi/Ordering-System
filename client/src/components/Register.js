import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';

import Button from './Button';
import LabelInput from './LabelInput';

import { isEmailValid, userValidation } from '../helpers/validation';
import { registerUser } from '../actions/user';
import { FormattedMessage } from 'react-intl';

export default _ => {
  const dispatch = useDispatch();
  const { isRegistering, hasRegistered } = useSelector(state => state.register);

  const [user, setUser] = useState({
    name: '', password: '', email: '', phone: '',
  });

  const [error, setError] = useState({ name: '', password: '', email: '', phone: '' });

  const checkValidation = _ => {
    const valObj = userValidation({ user: user, error });
    setError({ ...error, ...valObj.errors });
    return valObj.isFormValid;
  }

  const handleBlur = e => {
    const { name, value } = e.target;
    if(name === 'email') {
      if(isEmailValid(value)) {
        setError({ ...error, email: '' });
      }
    } else if(value){
      setError({ ...error, [name]: '' });
    }
  }

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(checkValidation()) {
      dispatch(registerUser(user));
    }
  }

  useEffect(() => {
    if(hasRegistered) {
      setTimeout(() => {
        setUser({
          name: '', password: '', email: '', phone: ''
        });
      }, 1000)
    }
  }, [hasRegistered]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <LabelInput 
          name="email"
          type="email"
          handleChange={handleChange}
          value={user.email}
          label="enter_email"
          needValidation={true}
          errorMessage={error.email}
          onBlur={handleBlur} 
        />

        <LabelInput 
          name="password"
          type="password"
          handleChange={handleChange}
          value={user.password}
          label="password"
          needValidation={true}
          errorMessage={error.password}
          onBlur={handleBlur} 
        />

        <LabelInput 
          name="name"
          type="text"
          handleChange={handleChange}
          value={user.name}
          label="name"
          needValidation={true}
          errorMessage={error.name}
          onBlur={handleBlur} 
        />

        <LabelInput 
          name="phone"
          type="text"
          handleChange={handleChange}
          value={user.phone}
          label="phone"
          needValidation={true}
          errorMessage={error.phone}
          onBlur={handleBlur} 
        />

        <Button label="register" type="submit" className="btn btn-primary" isLoading={isRegistering} />

        <div className="mt-2">
          <p>
            Already have an account? 
            <Link to="/"> <FormattedMessage id="login" /> </Link>
          </p>
        </div>

        
        <ToastContainer autoClose={2000} />

      </form>

    </React.Fragment>
  )
}