import React from 'react';

export default ({
  type,
  className,
  handleClick,
}) => {
  return (
    <button
      type={type ? type : ''} 
      className={className ? className : 'btn btn-primary' } 
      onClick={handleClick} 
    >
      {label}
    </button>
  )
}