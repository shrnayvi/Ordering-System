import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../Button';
import Input from '../../Input';

import { remove, editQuantity } from '../../../actions/cart';

export default props => {
  const { cart } = props;
  const dispatch = useDispatch();

  const handleChange = e => {
    const quantity = e.target.value;
    dispatch(editQuantity(cart._id, +quantity));
  }

  const handleClick = _ => {
    dispatch(remove(cart._id));
  }

  return (
    <React.Fragment>
      <tr>
        <td>{cart.item.name}</td>
        <td>{cart.item.price}</td>
        <td>
          <Input type="number" defaultValue={cart.quantity} handleChange={handleChange} />
        </td>
        <td>{cart.item.price * cart.quantity}</td>
        <td>
          <Button className="btn btn-danger" icon="remove" handleClick={handleClick} />
        </td >
      </tr>
    </React.Fragment>
  )
}