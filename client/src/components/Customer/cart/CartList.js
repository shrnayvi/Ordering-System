import React from 'react';

import Button from '../../Button';
import Input from '../../Input';

export default props => {
  const { cart } = props;

  const handleChange = _ => {

  }

  return (
    <React.Fragment>
      <tr>
        <td>{cart.item.name}</td>
        <td>{cart.item.price}</td>
        <td>
          <Input type="number" defaultValue={cart.quantity} />
        </td>
        <td>{'subtotal'}</td>
        <td>
          <Button className="btn btn-danger" icon="remove" />
        </td >
      </tr>
    </React.Fragment>
  )
}