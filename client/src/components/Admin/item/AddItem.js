import React, { useState } from 'react';

import LabelInput from '../../LabelInput';
import ImageUpload from '../../ImageUpload';
import Button from '../../Button';

export default _ => {

  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, category);
  }

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
          name="category"
          type="text"
          handleChange={(e) => setCategory(e.target.value)}
          value={category}
          label="category"
        />

        <ImageUpload 
            name="avatar"
            handleImageChange={() => {console.log('hello')}}
            value={'test'}
            filename={'test'}
            isUploading={false}
        />

        <Button type="submit" label="add_item" />

      </form>
    </React.Fragment>
  )
}