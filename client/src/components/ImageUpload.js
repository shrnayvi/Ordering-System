import React from 'react';

import LabelInput from './LabelInput';

export default ({
  isUploading,
  handleImageChange,
  filename,
}) => {
  return (
    <React.Fragment>
      <LabelInput type="file" label="upload_avatar" handleChange={handleImageChange} />
      <div className="preview">
        {
          isUploading && <i className="fa fa-spin fa-spinner"></i>
        }
        {
          filename && <img alt="img" src={`http://localhost:8000/uploads/thumbnail-${filename}`} />
        }
      </div>
    </React.Fragment>
  )
}