import { CATEGORY } from '../constants/actionTypes';
import { 
  getAll,
} from '../apiCalls/category';

export const get = _ => async dispatch => {
  dispatch({ type: CATEGORY.FETCH_REQUEST });

  const { data: response } = await getAll();
  
  if(response.status === 200) {
    const allIds = [];
    const byId = {};

    response.data.categories.forEach(category => {
      allIds.push(category._id);
      byId[category._id] = category;
    });


    dispatch({ type: CATEGORY.FETCH_ALL_SUCCESS, payload: { allIds, byId } });
  } else {
    dispatch({ type: CATEGORY.FETCH_FAILURE, payload: response.message });
  }
}