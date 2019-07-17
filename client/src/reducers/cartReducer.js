import { CART } from "../constants/actionTypes";

const initialState = {
  status: null,
  message: "",
  cartData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CART.ADD_REQUEST:
      return {
        ...state,
        addingToCart: true
      };
    case CART.ADD_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        status: action.payload.status,
        message: action.payload.message,
        cartData: action.payload.data
      };
    case CART.ADD_FAILURE:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        status: action.payload.status,
        message: action.payload.message
      };

    default:
      return state;
  }
};
