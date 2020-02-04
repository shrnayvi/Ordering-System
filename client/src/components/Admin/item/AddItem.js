import React, { useState } from 'react';
import { connect } from 'react-redux';

import LabelInput from '../../LabelInput';
import ImageUpload from '../../ImageUpload';
import Button from '../../Button';

import { add } from '../../../actions/item';
import { uploadMedia } from '../../../actions/media';

const AddItem = props => {

  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('');
  let [price, setPrice] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    props.add({ name, description, category, price: +price });
  }

  const handleImage = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('attachment', file)

    props.uploadMedia(formData);
  }

  const { uploaded, mediaUi } = props;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <LabelInput 
          name="name"
          type="text"
          handleChange={(e) => setName(e.target.value)}
          defaultValue={name}
          label="name"
        />

        <LabelInput 
          name="description"
          type="text"
          handleChange={(e) => setDescription(e.target.value)}
          value={description}
          label="description"
        />

        <LabelInput 
          name="price"
          type="text"
          handleChange={(e) => setPrice(e.target.value)}
          value={price}
          label="price"
        />

        <LabelInput 
          name="category"
          type="text"
          handleChange={(e) => setCategory(e.target.value)}
          value={category}
          label="category"
        />

        <ImageUpload 
            name="avatar"
            handleImageChange={handleImage}
            value={uploaded._id}
            filename={uploaded.filename}
            isUploading={mediaUi.isUploading}
        />

        <Button type="submit" label="add_item" />

      </form>
    </React.Fragment>
  )
}


const mapStateToProps = ({ media: { uploaded, ui } }) => ({ uploaded, mediaUi: ui });
const mapDispatchToProps = {
  add,
  uploadMedia,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);