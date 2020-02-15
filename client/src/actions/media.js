import { MEDIA } from "../constants/actionTypes";
import { create } from "../apiCalls/attachment";
import notify from '../helpers/notification';

export const uploadMedia = data => async dispatch => {
  dispatch({ type: MEDIA.ADD_REQUEST });

  const { data: response } = await create(data);

  console.log(response, 'response');
  if (response.status === 200) {
    dispatch({ type: MEDIA.ADD_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: MEDIA.ADD_FAILURE, payload: response.message });
    console.log(response.message);
    notify('error', response.message);
  }
};

export const updateMedia = media => async dispatch => {
  dispatch({ type: MEDIA.UPDATE_MEDIA, payload: media });
};

export const clearUploadedMedia = _ => async dispatch => {
  dispatch({ type: MEDIA.CLEAR_UPLOADED_MEDIA });
}