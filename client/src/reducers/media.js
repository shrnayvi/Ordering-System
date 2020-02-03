import { MEDIA } from "../constants/actionTypes";

const initialState = {
  byId: {},
  uploaded: {},
  ui: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MEDIA.ADD_REQUEST:
      return { ...state, ui: { ...state.ui, isUploading: true } };

    case MEDIA.ADD_SUCCESS:
      return { 
        ...state, 
        ui: { ...state.ui, isUploading: false } ,
        uploaded: action.payload,
      };

    case MEDIA.ADD_FAILURE:
      return { ...state, ui: { ...state.ui, isUploading: false } };

    case MEDIA.UPDATE_MEDIA:
      if(action.payload) {
        return { 
          ...state, 
          byId: {
            ...state.byId,
            [action.payload._id]: action.payload,
          }
        };
      } 
      return state;

    case MEDIA.CLEAR_UPLOADED_MEDIA:
      return {
        ...state,
        uploaded: {},
      };

    default:
      return state;
  }
};
