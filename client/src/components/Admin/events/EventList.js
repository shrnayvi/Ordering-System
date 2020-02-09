import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Button from '../../Button';
import Input from '../../Input';
import Textarea from '../../Textarea';

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

  const { isInEditingState, isEditing, isRemoving } = props.idUI;

  const handleRemove = _  => {
    if(window.confirm('Are you sure?')) {
      dispatch(remove(event._id));
    }
  };

  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleEdit = _ => {
    if(isInEditingState) {
      dispatch(edit(event._id, data))  
    } else {
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
              ? <Input name="name" type="text" onChange={handleChange} defaultValue={props.event.name} />
              : props.event.name
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <Textarea name="description" onChange={handleChange} defaultValue={props.event.description} />
              : props.event.description
            
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <div className="form-group">
                <select name="status" className="form-control" defaultValue={(props.event.status || '').toString()} onChange={handleChange}>
                  <option value="2">Closed</option>
                  <option value="1">Active</option>
                </select>
              </div>
              : <FormattedMessage id={EVENT[props.event.status] || 'invalid'} />
            
          }
        </td>

        <td>
          {
            isInEditingState 
              ? <Textarea name="priceLimit" onChange={handleChange} defaultValue={props.event.priceLimit} />
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