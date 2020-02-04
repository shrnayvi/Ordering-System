import { ITEM, MEDIA } from '../constants/actionTypes';
import { 
  getAll as getItems,
  addItem,
} from '../apiCalls/item';

export const getAll = _ => async dispatch => {
  dispatch({ type: ITEM.FETCH_ALL_REQUEST });

  const { data: response } = await getItems();
  
  if(response.status === 200) {
    const allIds = [];
    const byId = {};

    response.data.items.forEach(item => {
      allIds.push(item._id);
      const media = item.avatar;
      if(media) {
        item.avatar = media._id; 
        dispatch({ type: MEDIA.UPDATE_MEDIA, payload: media });
      }

      byId[item._id] = item;
    });

    dispatch({ type: ITEM.FETCH_ALL_SUCCESS, payload: { allIds, byId } });
  } else {
    dispatch({ type: ITEM.FETCH_ALL_FAILURE, payload: response.message });
  }
}

export const add = data => async dispatch => {
  dispatch({ type: ITEM.ADD_REQUEST });

  const { data: response } = await addItem(data);
  
  if(response.status === 200) {

    const item = response.data;
    const media = item.avatar;
    if(media) {
      item.avatar = media._id; 
      dispatch({ type: MEDIA.UPDATE_MEDIA, payload: media });
    }

    dispatch({ type: ITEM.ADD_SUCCESS, payload: item });
  } else {
    dispatch({ type: ITEM.ADD_FAILURE, payload: response.message });
  }
}