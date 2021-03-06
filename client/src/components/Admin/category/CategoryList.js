import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../Button';
import Input from '../../Input';
import Textarea from '../../Textarea';
import ShowError from '../../ShowError';

import { commonValidation } from '../../../helpers/validation';
import { edit, remove, toggleEditState } from '../../../actions/category';

export default props => {
  const dispatch = useDispatch();

  const { category } = props;
  const [data, setData] = useState({ name: category.name, description: category.description });
  const [error, setError] = useState({ name: '', description: '' });

  const { isInEditingState, isEditing, isRemoving } = props.idUI;

  const handleBlur = e => {
    if(e.target.value) {
      setError({ ...error, [e.target.name]: '' });
    }
  }

  const checkValidation = () => {
    const valObj = commonValidation({ inputs: data, error });
    setError({ ...error, ...valObj.errors });
    return valObj.isFormValid;
  }

  const handleRemove = _  => {
    if(window.confirm('Are you sure?')) {
      dispatch(remove(category._id));
    }
  };

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleEdit = _ => {
    if(isInEditingState) {
      if(checkValidation()) {
        dispatch(edit(category._id, data))  
      }
    } else {
      setError({ name: '', description: '' });
      dispatch(toggleEditState(props.category._id));
    }
  }

  const handleCancel = _ => {
    dispatch(toggleEditState(category._id));
  }

  return (
    <React.Fragment>
      <tr>
        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                  <Input 
                    name="name" 
                    type="text" 
                    onChange={handleChange} 
                    defaultValue={props.category.name} 
                    onBlur={handleBlur}
                  />
                  <ShowError message={error.name} />
                </div>
              : props.category.name
          }
        </td>
        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                  <Textarea 
                    name="description" 
                    onChange={handleChange} 
                    defaultValue={props.category.description} 
                    onBlur={handleBlur}
                  />
                  <ShowError message={error.description} />
                </div>
              : props.category.description
            
          }
          </td>
        <td>
          <Button label="edit" className="btn btn-success" icon={isInEditingState ? '' : 'edit'} onClick={handleEdit} isLoading={isEditing} />
          <Button label="remove" className="btn btn-danger" icon="remove" onClick={handleRemove} isLoading={isRemoving} />
          { 
            isInEditingState ? 
              <Button label="cancel" className="btn btn-danger" onClick={handleCancel} />
              : ''
          }
        </td>
      </tr>
    </React.Fragment>
  )
}