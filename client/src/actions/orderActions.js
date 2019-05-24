import { ORDER } from '../constants/actionTypes';
import * as orderService from '../services/orderService';

/**
 * Place order
 * @param {Object} data Data required to place order
 * @param {String} data.user User ID placing the order
 * @param {String} data.item Menu Item 
 */ 
export const placeOrder = data => async dispatch => {
   dispatch({ type: ORDER.CREATE_REQUEST});

   try {
      let { data: response }= await orderService.placeOrder(data);
      const { status, message } = response;
      if(response.status === 200) {
         dispatch({ type: ORDER.CREATE_SUCCESS, payload: response });
      } else {
         dispatch({ type: ORDER.CREATE_FAILURE, payload: { status, message }});
      }
   } catch(e) {
      dispatch({ type: ORDER.CREATE_FAILURE, payload: { status: 500, message: e.message} });
   }
}