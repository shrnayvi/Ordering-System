import { CART } from "../constants/actionTypes";
import findIndex from 'lodash/findIndex';

const initialState = {
  status: null,
  message: "",
  cartItems: [],
  totalPrice: 0,
};

const getTotalPrice = cartItems => {
    let total = 0;
    for(let i = 0, length = cartItems.length; i < length; i++) {
      total += cartItems[i].item.price * cartItems[i].quantity; 
    }
    return total;
  }

export default (state = initialState, action) => {
  switch (action.type) {
    /* Add to Cart  */
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
      };
    case CART.ADD_FAILURE:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        status: action.payload.status,
        message: action.payload.message
      };

    /* Fetch Cart */
    case CART.FETCH_REQUEST:
      return {
        ...state,
        addingToCart: null,
        addedToCart: null,
        fetchingCart: true,
      }
    case CART.FETCH_SUCCESS:
      let data = action.payload.data;
      return {
        ...state,
        fetchingCart: false,
        fetchedCart: true,
        status: action.payload.status,
        message: action.payload.message,
        cartItems: data,
        totalPrice: getTotalPrice(data)
      }
    case CART.FETCH_FAILURE:
      return {
        ...state,
        fetchedCart: null,
        fetchingCart: null,
        status: action.payload.status,
        message: action.payload.message,
      }

    /* Remove from Cart */
    case CART.REMOVE_REQUEST:
      return {
        ...state,
        removingFromCart: true,
        removedFromCart: false,
      }
    case CART.REMOVE_SUCCESS:
      let newCart = Object.assign([], state.cartItems.filter(c => c._id !== action.payload._id));

      return {
        ...state,
        removingFromCart: false,
        removedFromCart: true,
        cartItems: newCart,
        totalPrice: getTotalPrice(newCart)
      }
    case CART.REMOVE_FAILURE:
      return {
        ...state,
        removingFromCart: false,
        removedFromCart: false,
        status: action.payload.status,
        message: action.payload.message,
      }
      
    /* Change the quantity of item */
    case CART.CHANGE_QUANTITY:
      let cart = state.cartItems;
      let { _id, quantity } = action.payload;
      const index = findIndex(cart, { _id });
      const cartItems = Object.assign([], cart, { [index]: { ...cart[index], quantity }});

      return {
        ...state,
        cartItems,
        totalPrice: getTotalPrice(cartItems),
      }

    /* Rest cart status */
    case CART.RESET_STATUS:
      return {
        ...state,
        addedToCart: false,
        status: null,
        message: "",
      }

    /* Flush user cart after the order is placed */
    case CART.FLUSH:
      console.log('hello')
      return {
        ...state,
        cartItems: []
      }

    default:
      return state;
  }
};
