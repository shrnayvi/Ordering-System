import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { ToastContainer } from 'react-toastify';

import LabelInput from '../../LabelInput';
import LabelTextarea from '../../LabelTextarea';
import Button from '../../Button';

import { add } from '../../../actions/category';

export default props => {

  const [category, setCategory] = useState({ name: '', description: '' });
  const dispatch = useDispatch();

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(add(category, { currentPage: props.currentPage }));
  }

  return(
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <LabelInput 
          name="name"
          type="text"
          handleChange={handleChange}
          value={category.name}
          label="name"
        />

        <LabelTextarea
          name="description"
          handleChange={handleChange}
          value={category.description}
          label="description"
        />

        <Button className="btn btn-primary mt-3" type="submit" label="add_category" />

      </form>
      <ToastContainer />
    </React.Fragment>

  )
}