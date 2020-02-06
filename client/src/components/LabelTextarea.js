import React from 'react';
import { FormattedMessage } from 'react-intl';

import Textarea from './Textarea';

export default ({
  name,
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
      <Textarea
        name={name}
        className={className}
        handleChange={handleChange}
        {...rest}
      />
    </div>
  )
}