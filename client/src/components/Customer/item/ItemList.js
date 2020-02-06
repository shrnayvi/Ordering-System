import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Item = props => {
  const { _id } = props.item;
  return (
    <React.Fragment>
      <div className="odr-card-item card">
        <Link to={ {pathname: `/items/${_id}`} }><img alt="avatar" src={`http://localhost:8000/uploads/medium-${props.avatar.filename}`} /></Link>
        <div className="card-body">
          <Link to={ { pathname: `/items/${_id}` } }><h5 className="card-title">{props.item.name}</h5></Link>
          <p className="card-text">{props.item.description}</p>
          <button href="" className="btn btn-info">Add to Cart</button>
        </div>
      </div>

    </React.Fragment>
  )
}



export default connect()(Item)