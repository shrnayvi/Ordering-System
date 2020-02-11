import get from 'lodash/get';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Button from '../../Button';

import { ORDER } from '../../../constants/status';
import { edit, toggleEditState } from '../../../actions/order';

export default props => {
  const dispatch = useDispatch();
  const { events } = useSelector(({ users, events }) => ({ users: users.byId, events: events.byId }));

  const { order } = props;
  const [data, setData] = useState({ status: order.status });

  const { isInEditingState, isEditing } = props.idUI;

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleEdit = _ => {
    if(isInEditingState) {
      if(window.confirm('Are you sure?')) {
        dispatch(edit(order._id, data))  
      }
    } else {
      dispatch(toggleEditState(order._id));
    }
  }

  const handleCancel = _ => {
    dispatch(toggleEditState(order._id));
  }

  return (
    <React.Fragment>
      <tr>
        <td>
          <Link to={`/customer/order-detail/${order._id}`}>{order.orderNumber}</Link>
        </td>
        <td> {get(events, `${order.event}.name`, '')} </td>
        <td> 
          {
            isInEditingState 
              ? <div className="form-group">
                <select name="status" className="form-control" defaultValue={(order.status || '').toString()} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="0">Cancel</option>
                </select>
              </div>
              : <FormattedMessage id={ORDER[order.status]} />
          }
        </td>
        <td>{order.totalPrice}</td>
        <td>{order.totalQuantity}</td>
        <td>
          <Button label="edit" className="btn btn-success" icon={isInEditingState ? '' : 'edit'} onClick={handleEdit} isLoading={isEditing} />
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