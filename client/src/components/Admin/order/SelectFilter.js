import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({
  name,
  value,
  handleChange,
  children,
  label,
}) => {
  return (
    <div className="form-group mt-2">
      <label><FormattedMessage id={label} /></label>
      <select name={name} className="form-control" value={value} onChange={handleChange} >
        {children}
      </select>
    </div>
  )
}