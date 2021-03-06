import React from 'react';

export default ({
  name,
  type,
  className,
  handleChange,
  ...rest
}) => {
  return (
    <input 
      name={name}
      type={type ? type : 'text'} 
      className={className ? className : 'form-control' } 
      onChange={handleChange} 
      {...rest}
    />
  )
}