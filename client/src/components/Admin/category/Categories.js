import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Button from '../../Button';
import Sidebar from '../Sidebar';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';

import { get } from '../../../actions/category';

export default props => {

  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const {
    allIds,
    byId,
    currentPage,
  } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(get());
  }, []);

  const handleToggleAdd = _ => setIsAdding(!isAdding);

  const categoryList = allIds.map(_id => (
    <CategoryList
      key={_id}
      category={byId[_id]}
    />
  ));

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1> <FormattedMessage id="categories" /> </h1>
        <Button label="add" handleClick={handleToggleAdd} />

        { isAdding ? <div className="mb-3"><AddCategory currentPage={currentPage} /></div> : '' }

        <table className="table mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { categoryList }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}