import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';

import LabelInput from '../../LabelInput';
import ImageUpload from '../../ImageUpload';
import Button from '../../Button';

import { add } from '../../../actions/item';
import { get as getCategory } from '../../../actions/category';
import { uploadMedia } from '../../../actions/media';

const AddItem = props => {

  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('');
  let [price, setPrice] = useState('');


  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      description,
      category,
      price: +price,
      avatar: uploaded._id,
    }
    props.add(data);
  }

  const handleImage = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('attachment', file)

    props.uploadMedia(formData);
  }

  const { uploaded, mediaUi } = props;

  useEffect(() => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
  }, [props.allIds])

  const { allIds: categories, byId: categoryId } = props.categories;
  const categoryOptions = categories.map(_id => (<option key={_id} value={_id}>{categoryId[_id].name}</option>))
  console.log(categories);

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

        <LabelInput 
          name="description"
          type="text"
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
          <select className="form-control" onChange={e => setCategory(e.target.value)}>
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


const mapStateToProps = ({ 
  media: { uploaded, ui },
  categories,
  items: { allIds }
}) => ({ 
  uploaded, 
  mediaUi: ui,
  categories,
  allIds,
});

const mapDispatchToProps = {
  add,
  uploadMedia,
  getCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);