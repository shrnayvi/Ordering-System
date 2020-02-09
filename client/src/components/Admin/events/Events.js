import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Button from '../../Button';
import Sidebar from '../Sidebar';
import AddEvent from './AddEvent';
import EventList from './EventList';
import Pagination from '../../Pagination';

import config from '../../../constants/config';
import { usePrevious } from '../../../helpers/hook';
import { getPagingArgs } from '../../../helpers/pagination';
import { get, fillRemainingDataWhenRemoving } from '../../../actions/event';

export default props => {

  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const {
    allIds,
    byId,
    currentPage,
    pageCount,
    idUI,
    total,
    startIndex,
    endIndex,
  } = useSelector(state => state.events);

  const prevIds = usePrevious(allIds) || [];

  useEffect(() => {
    const idsLength = allIds.length;
    if(
      startIndex + idsLength - 1 < endIndex &&
      idsLength < prevIds.length && 
      idsLength < config.dataPerPage && 
      idsLength < total
    ) {
      dispatch( fillRemainingDataWhenRemoving({ skip: startIndex + idsLength, limit: config.dataPerPage - idsLength }) );
    }
  });

  useEffect(() => {
    const pagingArgs = getPagingArgs(props.history.location);
    dispatch(get(pagingArgs))
  }, [dispatch, props.history.location]);

  const handleToggleAdd = _ => setIsAdding(!isAdding);

  const eventList = allIds.map(_id => (
    <EventList
      key={_id}
      event={byId[_id]}
      idUI={idUI[_id] || {}}
    />
  ));

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1> <FormattedMessage id="events" /> </h1>
        <Button label={isAdding ? 'cancel' : 'add'} handleClick={handleToggleAdd} />

        { isAdding ? <div className="mb-3"><AddEvent currentPage={currentPage} allIds={allIds} byId={byId} /></div> : '' }

        <table className="table mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Price Limit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {eventList}
          </tbody>
        </table>

        <div className="mt-4">
          <Pagination currentPage={currentPage} routePath="/admin/events" pageCount={pageCount} />
        </div>
      </div>
    </React.Fragment>
  );
}
