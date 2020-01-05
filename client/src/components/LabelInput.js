import React from 'react';
import { FormattedMessage } from 'react-intl';

import Input from './Input';

export default ({
  name,
  type,
  className,
  handleChange,
  label,
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
    </div>
  )
}