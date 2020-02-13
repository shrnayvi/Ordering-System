import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import LabelInput from '../../LabelInput';
import LabelTextarea from '../../LabelTextarea';
import Button from '../../Button';
import ShowError from '../../ShowError';

import { commonValidation } from '../../../helpers/validation';
import { add, removeLastId } from '../../../actions/event';
import config from '../../../constants/config';

export default props => {

  const [event, setEvent] = useState({ name: '', description: '',status: '', priceLimit: '' });
  const [error, setError] = useState({ name: '', description: '', status: '', priceLimit: '' });

  const dispatch = useDispatch();

  const checkValidation = _ => {
    const valObj = commonValidation({ inputs: event, error });
    setError({ ...error, ...valObj.errors });
    return valObj.isFormValid;
  }

  const handleBlur = e => {
    if(e.target.value) {
      setError({ ...error, [e.target.name]: '' });
    }
  }

  const handleChange = e => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(checkValidation()) {
      dispatch(add(event, { currentPage: props.currentPage }));
    }
  }

  useEffect(() => {
    setEvent({ name: '', description: '', status: '', priceLimit: '' });

    if(props.currentPage === 1 && props.allIds.length > config.dataPerPage) {
      dispatch(removeLastId());
    }

  }, [props.byId, dispatch, props.allIds, props.currentPage ])

  return(
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <LabelInput 
          name="name"
          type="text"
          handleChange={handleChange}
          value={event.name}
          label="name"
          onBlur={handleBlur}
          needValidation={true}
          errorMessage={error.name}
        />

        <LabelTextarea
          name="description"
          handleChange={handleChange}
          value={event.description}
          label="description"
          onBlur={handleBlur}
          needValidation={true}
          errorMessage={error.description}
        />

        <div className="form-group">
          <label><FormattedMessage id="status" /></label>
          <select name="status" className="form-control" value={event.status} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select Category</option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
            <option></option>
          </select>
          <ShowError message={error.status} />
        </div>

        <LabelInput 
          name="priceLimit"
          type="number"
          handleChange={handleChange}
          value={event.priceLimit}
          label="price_limit"
          needValidation={true}
          errorMessage={error.priceLimit}
          onBlur={handleBlur}
        />

        <Button className="btn btn-primary mt-3" type="submit" label="add_event" />

      </form>
      <ToastContainer />
    </React.Fragment>

  )
}