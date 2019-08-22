import findIndex from 'lodash/findIndex'
import { CATEGORY } from "../constants/actionTypes";

const initialState = {
  status: null,
  message: "",
  categories: [],
  editData: {},
  total: 0,
  pageCount: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY.RESET_STATUS:
      return {
        ...state,
        status: null,
        message: '',
        addingCategory: null,
        editingCategory: null,
        addedCategory: null,
        editedCategory: null,
        fetchingCategory: null,
        fetchedCategory: null,
        editData: {}
      };

    /* Add Category  */
    case CATEGORY.ADD_REQUEST:
      return {
        ...state,
        addingCategory: true
      };
    case CATEGORY.ADD_SUCCESS:
      return {
        ...state,
        addingCategory: false,
        addedCategory: true,
        status: action.payload.status,
        message: action.payload.message,
        cateogries: [action.payload.data, ...state.categories] 
      };
    case CATEGORY.ADD_FAILURE:
      return {
        ...state,
        addingCategory: false,
        addedCategory: true,
        status: action.payload.status,
        message: action.payload.message
      };

    /* Update Category */
    case CATEGORY.UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true
      };
    case CATEGORY.UPDATE_SUCCESS:
      const { _id } = action.payload.data;
      const oldCategories = state.categories;
      const index = findIndex(oldCategories, { _id });
      const categories= Object.assign([], oldCategories, { [index]: action.payload.data });

      return {
        ...state,
        isUpdating: false,
        updatedCategory: true,
        status: action.payload.status,
        message: action.payload.message,
        categories,
      };
    case CATEGORY.UPDATE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        updatedCategory: true,
        status: action.payload.status,
        message: action.payload.message
      };

    /* Fetch Category */
    case CATEGORY.FETCH_REQUEST:
      return {
        ...state,
        addingCategory: null,
        addedCategory: null,
        fetchingCategory: true,
      }
    case CATEGORY.FETCH_ALL_SUCCESS:
      return {
        ...state,
        fetchingCategory: false,
        fetchedCategory: true,
        status: action.payload.status,
        message: action.payload.message,
        categories: action.payload.data.category,
        total: action.payload.data.total,
        pageCount: action.payload.data.pageCount,
      }
    case CATEGORY.FETCH_SINGLE_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        editData: action.payload.data,
      }
    case CATEGORY.FETCH_FAILURE:
      return {
        ...state,
        fetchingCategory: null,
        fetchedCategory: null,
        status: action.payload.status,
        message: action.payload.message,
      }

    /* Remove Category */
    case CATEGORY.REMOVE_REQUEST:
      return {
        ...state,
        removingCategory: true,
      }
    case CATEGORY.REMOVE_SUCCESS:
      let newCategory = Object.assign([], state.categories.filter(c => c._id !== action.payload._id));

      return {
        ...state,
        removingCategory: false,
        removedCategory: true,
        categories: newCategory,
      }
    case CATEGORY.REMOVE_FAILURE:
      return {
        ...state,
        removingCategory: false,
        removedCategory: false,
        status: action.payload.status,
        message: action.payload.message,
      }

    case CATEGORY.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        editData: { ...state.editData, ...action.payload }
      };
      
    default:
      return state;
  }
};
