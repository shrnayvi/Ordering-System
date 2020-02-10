import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Button from '../../Button';

import { add as addToCart } from '../../../actions/cart';

const Item = props => {
  const dispatch = useDispatch();

  const { _id } = props.item;

  const handleAddCart = _ => {
    dispatch(addToCart({ item: _id }));
  }

  return (
    <React.Fragment>
      <div className="odr-card-item card">
        <Link to={ {pathname: `/items/${_id}`} }><img alt="avatar" src={`http://localhost:8000/uploads/medium-${props.avatar.filename}`} /></Link>
        <div className="card-body">
          <Link to={ { pathname: `/items/${_id}` } }><h5 className="card-title">{props.item.name}</h5></Link>
          <p className="card-text">{props.item.description}</p>
          <Button label="add_to_cart" className="btn btn-info" handleClick={handleAddCart} />
        </div>
      </div>

      <ToastContainer />

    </React.Fragment>
  )
}



export default connect()(Item)