import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';

import Button from './Button';
import LabelInput from './LabelInput';

import { registerUser } from '../actions/user';
import { FormattedMessage } from 'react-intl';

export default _ => {
  const dispatch = useDispatch();
  const { isRegistering, hasRegistered } = useSelector(state => state.register);

  const [user, setUser] = useState({
    name: '', password: '', email: '', phone: '',
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(user));
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
        />

        <LabelInput 
          name="password"
          type="password"
          handleChange={handleChange}
          value={user.password}
          label="password"
        />

        <LabelInput 
          name="name"
          type="text"
          handleChange={handleChange}
          value={user.name}
          label="name"
        />

        <LabelInput 
          name="phone"
          type="text"
          handleChange={handleChange}
          value={user.phone}
          label="phone"
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