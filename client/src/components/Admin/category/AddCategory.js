import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { ToastContainer } from 'react-toastify';

import LabelInput from '../../LabelInput';
import LabelTextarea from '../../LabelTextarea';
import Button from '../../Button';

import { commonValidation } from '../../../helpers/validation';
import { add, removeLastId } from '../../../actions/category';
import config from '../../../constants/config';

export default props => {

  const [category, setCategory] = useState({ name: '', description: '' });
  const [error, setError] = useState({ name: '', description: '' });

  const dispatch = useDispatch();

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  const checkValidation = _ => {
    const valObj = commonValidation({ inputs: category, error });
    setError({ ...error, ...valObj.errors });
    return valObj.isFormValid;
  }

  const handleBlur = e => {
    if(e.target.value) {
      setError({ ...error, [e.target.name]: '' });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(checkValidation()) {
      dispatch(add(category, { currentPage: props.currentPage }));
    }
  }

  useEffect(() => {
    setCategory({ name: '', description: '' });

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
          value={category.name}
          label="name"
          needValidation={true}
          errorMessage={error.name}
          onBlur={handleBlur}
        />

        <LabelTextarea
          name="description"
          handleChange={handleChange}
          value={category.description}
          label="description"
          needValidation={true}
          errorMessage={error.description}
          onBlur={handleBlur}
        />

        <Button className="btn btn-primary mt-3" type="submit" label="add_category" />

      </form>
      <ToastContainer />
    </React.Fragment>

  )
}