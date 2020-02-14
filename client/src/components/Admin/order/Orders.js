import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import qs from 'query-string';

import Sidebar from '../Sidebar';
import OrderList from './OrderList';
import Pagination from '../../Pagination';
import SelectStatus from './SelectFilter';

import { getPagingArgs } from '../../../helpers/pagination';
import { get } from '../../../actions/order';
import { get as getEvents } from '../../../actions/event';

export default props => {

  const dispatch = useDispatch();

  const { status: selectedStatus, selectedEvent } = getPagingArgs(props.history.location);
  const [status, setStatus] = useState(selectedStatus);
  const [event, setEvent] = useState(selectedEvent);

  const {
    allIds,
    byId,
    currentPage,
    pageCount,
    idUI,
  } = useSelector(state => state.orders);

  const { allIds: events, byId: eventById }= useSelector(state => state.events)

  const handleStatusChange = e => {
    setStatus(e.target.value);
    let query = '';
    if(event) {
      query = `&${qs.stringify({ event })}`
    }
    props.history.push(`/admin/orders?status=${e.target.value}${query}`);
  }

  const handleEventChange = e => {
    setEvent(e.target.value);
    let query = '';
    if(status) {
      query = `&${qs.stringify({ status })}`
    }

    props.history.push(`/admin/orders?event=${e.target.value}${query}`);
  }

  useEffect(() => {
    const pagingArgs = getPagingArgs(props.history.location);
    dispatch(get(pagingArgs))
  }, [dispatch, props.history.location]);

  useEffect(() => {
    dispatch(getEvents({ skip: 0, limit: 100 }));
  }, [dispatch]);

  const orderList = allIds.map(_id => (
    <OrderList
      key={_id}
      order={byId[_id]}
      idUI={idUI[_id] || {}}
    />
  ));

  const eventOptions = events.map(_id => (
    <option value={_id} key={_id}>{eventById[_id].name}</option>
  ))

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1> <FormattedMessage id="orders" /> </h1>
        <div className="row">
          <div className="col">
            <SelectStatus name="status" label="select_status" value={status} handleChange={handleStatusChange}>
              <option value="">Select Status</option>
              <option value="-1">Pending</option>
              <option value="0">Cancelled</option>
              <option value="1">Confirmed</option>
              <option value="2">Delivered</option>
            </SelectStatus>
          </div>

          <div className="col">
            <SelectStatus name="event" label="select_event" value={event} handleChange={handleEventChange}>
              <option value="">Select event</option>
              {eventOptions}
            </SelectStatus>
          </div>

        </div>

        <table className="table mt-2">
          <thead>
            <tr>
              <th><FormattedMessage id="order_number" /></th>
              <th><FormattedMessage id="user" /></th>
              <th><FormattedMessage id="event" /></th>
              <th><FormattedMessage id="status" /></th>
              <th><FormattedMessage id="total_price" /></th>
              <th><FormattedMessage id="total_quantity" /></th>
              <th><FormattedMessage id="action" /></th>
            </tr>
          </thead>
          <tbody>
            {orderList}
          </tbody>
        </table>

        <div className="mt-4">
          <Pagination currentPage={currentPage} routePath="/admin/orders" pageCount={pageCount} />
        </div>
      </div>
    </React.Fragment>
  );
}
