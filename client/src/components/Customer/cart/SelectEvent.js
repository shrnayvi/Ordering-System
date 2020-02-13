import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ShowError from '../../ShowError';

import { get as getEvents } from '../../../actions/event';
import { selectEvent } from '../../../actions/cart';

export default ({ errorMessage, ...rest }) => {

  const dispatch = useDispatch();

  const { allIds, byId }= useSelector(({ events }) => events);

  useEffect(() => {
    dispatch(getEvents({ skip: 0, limit: 100, status: 1 }));
  }, [dispatch]);

  const handleChange = e => {
    dispatch(selectEvent(e.target.value || null));
  }

  const eventOptions = allIds.map(_id => (
    <option value={_id} key={_id}>{byId[_id].name}</option>
  ))

  return (
    <React.Fragment>
      <label>Select Event</label>
      <select name="event" onChange={handleChange} className="form-control" {...rest}>
        <option value="">Select</option>
        {eventOptions}
      </select>
      <ShowError message={errorMessage}/>
    </React.Fragment>
  )
}