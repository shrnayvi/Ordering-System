import React from 'react';
import { FormattedMessage } from 'react-intl';

import ShowError from './ShowError';
import Input from './Input';

export default ({
  name,
  type,
  className,
  handleChange,
  label,
  needValidation,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label>
        <FormattedMessage id={label} />
      </label> 
      <Input 
        name={name}
        type={type}
        className={className}
        handleChange={handleChange}
        {...rest}
      />

      { needValidation ? <ShowError message={errorMessage} /> : '' }

    </div>
  )
}