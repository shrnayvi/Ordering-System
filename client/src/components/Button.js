import React from 'react';

export default ({
  type,
  className,
  handleClick,
  isLoading,
  label,
  ...rest
}) => {
  return (
    <button
      type={type ? type : ''} 
      className={className ? className : 'btn btn-primary' } 
      onClick={handleClick} 
      {...rest}
    >
      {label}
      { isLoading ? <i className="fa fa-spinner fa-spin"></i>: '' }
    </button>
  )
}