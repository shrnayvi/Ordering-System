import findIndex from 'lodash/findIndex'
import { ITEM } from '../constants/actionTypes';

const initialState = {
  itemData: [],
  singleItem: {},
  categoryItems: [],
  status: null,
  message: null,
  fetchingItems: false,
  fetchItemsFailure: false,
  editData: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEM.RESET_STATUS:
      return {
        ...state,
        message: '',
        status: null,
        fetchingItems: null,
        fetchItemFailure: null,
        fetchComplete: null,
        updatingItem: null,
        updatedItem: null,
        removingItem: null,
        removedItem: null,
        editData: {},
      }

    case ITEM.FETCH_ALL_REQUEST:
      return {
        ...state,
        fetchingItems: true,
        fetchItemFailure: false,
      }
    case ITEM.FETCH_ALL_SUCCESS:
      return {
        ...state,
        fetchingItems: false,
        fetchItemFailure: false,
        itemData: action.payload,
      }
    case ITEM.FETCH_ALL_FAILURE:
      return {
        ...state,
        fetchingItems: false,
        fetchItemFailure: true,
        status: action.payload.status,
        message: action.payload.message
      };
    case ITEM.FETCH_SINGLE_REQUEST:
      return {
        ...state,
        fetchingItems: true,
        fetchItemFailure: true,
        status: null,
        message: null
      };
    case ITEM.FETCH_SINGLE_SUCCESS:
      return {
        ...state,
        fetchingItems: false,
        fetchComplete: true,
        status: null,
        // message: action.payload.message,
        singleItem: action.payload.data,
        editData: {
          ...action.payload.data,
          category: (action.payload.data.category || {})._id
        }
      };
    case ITEM.FETCH_SINGLE_FAILURE:
      return {
        ...state,
        fetchingItems: false,
        fetchComplete: true,
        status: action.payload.status,
        message: action.payload.message,
        singleItem: {},
      };
    case ITEM.FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        fetchingItems: true,
        fetchItemFailure: false,
      }
    case ITEM.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchingItems: false,
        fetchItemFailure: false,
        categoryItems: action.payload,
      }
    case ITEM.FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        fetchingItems: false,
        fetchItemFailure: true,
        status: action.payload.status,
        message: action.payload.message
      };

    /* Add Item */
    case ITEM.ADD_REQUEST:
      return {
        ...state,
        addingItem: true
      };
    case ITEM.ADD_SUCCESS:
      return {
        ...state,
        addingItem: false,
        addedItem: true,
        status: action.payload.status,
        message: action.payload.message,
        itemData: [action.payload.data, ...state.itemData] 
      };
    case ITEM.ADD_FAILURE:
      return {
        ...state,
        addingItem: false,
        addedItem: false,
        status: action.payload.status,
        message: action.payload.message
      };

    /* Update Category */
    case ITEM.UPDATE_REQUEST:
      return {
        ...state,
        updatingItem: true
      };
    case ITEM.UPDATE_SUCCESS:
      const { _id } = action.payload.data;
      const oldItems = state.itemData;
      const index = findIndex(oldItems, { _id });
      const items = Object.assign([], oldItems, { [index]: action.payload.data });

      return {
        ...state,
        updatingItem: false,
        updatedItem: true,
        status: action.payload.status,
        message: action.payload.message,
        itemData: items,
      };
    case ITEM.UPDATE_FAILURE:
      return {
        ...state,
        updatingItem: false,
        updatedItem: false,
        status: action.payload.status,
        message: action.payload.message
      };

    /* Remove Category */
    case ITEM.REMOVE_REQUEST:
      return {
        ...state,
        removingItem: true,
      }
    case ITEM.REMOVE_SUCCESS:
      let newItems = Object.assign([], state.itemData.filter(c => c._id !== action.payload._id));

      return {
        ...state,
        removingItem: false,
        removedItem: false,
        itemData: newItems,
      }
    case ITEM.REMOVE_FAILURE:
      return {
        ...state,
        removingItem: false,
        remvoedItem: false,
        status: action.payload.status,
        message: action.payload.message,
      }

    case ITEM.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        editData: { ...state.editData, ...action.payload }
      };

    default:
      return state;
  }
}