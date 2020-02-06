import React from 'react';

export default ({
  name,
  className,
  handleChange,
  ...rest
}) => {
  return (
    <textarea 
      name={name}
      className={className ? className : 'form-control' } 
      onChange={handleChange} 
      {...rest}
    >
      {rest.value}
    </textarea>
  )
}