import React from 'react';

import Button from '../../Button';


export default props => {
  const isInEditingState = false;
  const handleEdit = _  => ({});
  const isRemoving = false;
  const handleRemoveClick= _  => ({});

  return (
    <React.Fragment>
      <tr>
        <td>{props.category.name}</td>
        <td>{props.category.description}</td>
        <td>
          <Button label="edit" className="btn btn-success" icon={isInEditingState? '' : 'edit'} onClick={handleEdit} />
          <Button label="remove" className="btn btn-danger" icon="remove" onClick={handleRemoveClick} isLoading={isRemoving} />
        </td>
      </tr>
    </React.Fragment>
  )
}