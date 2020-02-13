import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import ShowError from '../../ShowError';
import Button from '../../Button';
import Input from '../../Input';
import Textarea from '../../Textarea';

import { commonValidation } from '../../../helpers/validation';
import { EVENT } from '../../../constants/status';
import { edit, remove, toggleEditState } from '../../../actions/event';

export default props => {
  const dispatch = useDispatch();

  const { event } = props;
  const [data, setData] = useState({ 
    name: event.name, 
    description: event.description, 
    status: event.status, 
    priceLimit: event.priceLimit,
  });

  const [error, setError] = useState({ name: '', description: '', status: '', priceLimit: '' });

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
      dispatch(remove(event._id));
    }
  };

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleEdit = _ => {
    if(isInEditingState) {
      if(checkValidation()) {
        dispatch(edit(event._id, data))  
      }
    } else {
      setError({ name: '', description: '', status: '', priceLimit: '' });
      dispatch(toggleEditState(props.event._id));
    }
  }

  const handleCancel = _ => {
    dispatch(toggleEditState(event._id));
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
                    defaultValue={props.event.name} 
                    onBlur={handleBlur} 
                  />
                  <ShowError message={error.name} />
                </div>
              : props.event.name
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                <Textarea 
                  name="description" 
                  onChange={handleChange} 
                  defaultValue={props.event.description} 
                  onBlur={handleBlur} 
                />
                  <ShowError message={error.description} />
                </div>
              : props.event.description
            
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                <select 
                  name="status" 
                  className="form-control" 
                  defaultValue={(props.event.status || '').toString()} 
                  onChange={handleChange}
                >
                  <option value="2">Closed</option>
                  <option value="1">Active</option>
                </select>
                <ShowError message={error.status} />
              </div>
              : <FormattedMessage id={EVENT[props.event.status] || 'invalid'} />
            
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                  <Input 
                    type="number" 
                    name="priceLimit" 
                    onChange={handleChange} 
                    defaultValue={props.event.priceLimit} 
                    onBlur={handleBlur} 
                  />
                  <ShowError message={error.priceLimit} />
                </div>
              : props.event.priceLimit
            
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