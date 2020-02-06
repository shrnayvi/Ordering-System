import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';

import LabelInput from '../../LabelInput';
import LabelTextarea from '../../LabelTextarea';
import ImageUpload from '../../ImageUpload';
import Button from '../../Button';

import config from '../../../constants/config';
import { add, removeLastId } from '../../../actions/item';
import { uploadMedia } from '../../../actions/media';

export default props => {

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [price, setPrice] = useState('');

  const {
    media: { uploaded, ui: mediaUi },
    categories,
    items: { allIds, byId },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      description,
      category,
      price: +price,
      avatar: uploaded._id,
    }
    dispatch(add(data, { currentPage: props.currentPage }));
  }

  const handleImage = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('attachment', file)

    dispatch(uploadMedia(formData));
  }

  useEffect(() => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');

    if(props.currentPage === 1 && allIds.length > config.dataPerPage) {
      dispatch(removeLastId());
    }

  }, [byId, dispatch, allIds, props])

  const { allIds: categoryIds, byId: categoryId } = categories;
  const categoryOptions = categoryIds.map(_id => (<option key={_id} value={_id}>{categoryId[_id].name}</option>))

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <LabelInput 
          name="name"
          type="text"
          handleChange={e => setName(e.target.value)}
          value={name}
          label="name"
        />

        {/* <LabelInput 
          name="description"
          type="text"
          handleChange={e => setDescription(e.target.value)}
          value={description}
          label="description"
        /> */}

        <LabelTextarea
          name="description"
          handleChange={e => setDescription(e.target.value)}
          value={description}
          label="description"
        />

        <LabelInput 
          name="price"
          type="text"
          handleChange={e => setPrice(e.target.value)}
          value={price}
          label="price"
        />

        <div className="form-group">
          <label><FormattedMessage id="category" /></label>
          <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categoryOptions}
          </select>
        </div>

        <ImageUpload 
            name="avatar"
            handleImageChange={handleImage}
            value={uploaded._id}
            filename={uploaded.filename}
            isUploading={mediaUi.isUploading}
        />

        <Button className="btn btn-primary mt-3" type="submit" label="add_item" />

      </form>
      <ToastContainer />
    </React.Fragment>
  )
}