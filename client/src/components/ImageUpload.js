import React from 'react';

import LabelInput from './LabelInput';

export default ({
  type,
  name,
  isUploading,
  handleChange,
  handleImageChange,
  filename,
  ...rest
}) => {

  return (
    <React.Fragment>
      <LabelInput type="file" label="upload_avatar" handleChange={handleImageChange} />
      <div class="preview">
        {
          isUploading && <i class="fa fa-spin fa-circle-notch"></i>
        }
        {
          filename && <img alt="img" src={`http://localhost:8000/uploads/thumbnail-${filename}`} />
        }
      </div>
    </React.Fragment>
  )
}