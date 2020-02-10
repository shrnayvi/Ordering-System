import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({
  type,
  className,
  handleClick,
  isLoading,
  label,
  icon,
  ...rest
}) => {
  return (
    <button
      type={type ? type : ''} 
      className={className ? className : 'btn btn-primary' } 
      onClick={handleClick} 
      {...rest}
    >
      { label ? <FormattedMessage id={label} /> : '' }
      { icon ? <i className={`fa fa-${icon}`} /> : '' }
      { isLoading ? <i className="fa fa-spinner fa-spin"></i>: '' }
    </button>
  )
}