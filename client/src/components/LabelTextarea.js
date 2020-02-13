import React from 'react';
import { FormattedMessage } from 'react-intl';

import Textarea from './Textarea';
import ShowError from './ShowError';

export default ({
  name,
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
      <Textarea
        name={name}
        className={className}
        handleChange={handleChange}
        {...rest}
      />
    { needValidation ? <ShowError message={errorMessage} /> : '' }
    </div>
  )
}