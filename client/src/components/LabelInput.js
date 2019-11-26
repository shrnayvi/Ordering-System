import React from 'react';
import Input from './Input';

export default ({
  name,
  type,
  className,
  handleChange,
  label,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label> 
      <Input 
        name={name}
        type={type}
        className={className}
        handleChange={handleChange}
      />
    </div>
  )
}