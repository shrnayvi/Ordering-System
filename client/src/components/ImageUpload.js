import React, { useState } from 'react';

import LabelInput from './LabelInput';
import Input from './Input';

export default (props) => {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('');

  function handleChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewUrl(reader.result);
    }
  }
  console.log(file);


  return (
    <React.Fragment>
      <LabelInput type="file" label="upload_avatar" handleChange={handleChange} />
      <Input type="text" name="avatar" label="avatar" hidden={true} />
      <div id="preview"></div>
    </React.Fragment>
  )
}