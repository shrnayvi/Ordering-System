import { ITEM } from '../constants/actionTypes';
import * as itemService from '../services/itemService';

/**
 * Fetch all the items
 */ 
export const fetchItems = () => async (dispatch) => {
   dispatch({ type: ITEM.FETCH_ALL_REQUEST });

   try {
      let { data: response }= await itemService.getAll();
      if(response.status === 200) {
         dispatch({ type: ITEM.FETCH_ALL_SUCCESS, payload: response.data })
      } else {
         const { status, message } = response
         dispatch({ type: ITEM.FETCH_ALL_FAILURE, payload: { status, message }});
      }
   } catch(e) {
      dispatch({ type: ITEM.FETCH_ALL_FAILURE, payload: { status: 500, message: e.message} });
   }
}


/**
 * Fetch item by slug
 */ 
export const fetchBySlug = slug => async dispatch => {
   dispatch({ type: ITEM.FETCH_SINGLE_REQUEST });

   try {
      let { data: response }= await itemService.getBySlug(slug);
      const { status, message } = response;
      if(response.status === 200) {
         dispatch({ type: ITEM.FETCH_SINGLE_SUCCESS, payload: { message, data: response.data } });
      } else {
         dispatch({ type: ITEM.FETCH_SINGLE_FAILURE, payload: { status, message }});
      }
   } catch(e) {
      dispatch({ type: ITEM.FETCH_SINGLE_FAILURE, payload: { status: 500, message: e.message} });
   }
}
