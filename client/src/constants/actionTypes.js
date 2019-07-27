export const USER = {
  LOGIN_RESET: 'login_reset',
  LOGIN_REQUEST: 'login_request',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  LOGIN_CLEAR: 'login_clear',

  LOGOUT_REQUEST: 'logout_request',
  LOGOUT_SUCCESS: 'logout_success',
  LOGOUT_FAILURE: 'logout_failure',

  FORGOT_PASSWORD_REQUEST: 'forgot_password_request',
  FORGOT_PASSWORD_SUCCESS: 'forgot_password_success',
  FORGOT_PASSWORD_ERROR: 'forgot_password_error',
  FORGOT_PASSWORD_FAILURE: 'forgot_password_failure',

  RESET_PASSWORD_REQUEST: 'reset_password_request',
  RESET_PASSWORD_SUCCESS: 'reset_password_success',
  RESET_PASSWORD_ERROR: 'reset_password_error',
  RESET_PASSWORD_FAILURE: 'reset_password_failure',

  REGISTER_CLEAR: 'register_clear',
  REGISTER_REQUEST: 'register_request',
  REGISTER_SUCCESS: 'register_success',
  REGISTER_ERROR: 'register_error',
  REGISTER_FAILURE: 'register_failure',

  FETCH_USER: 'fetch_user',
  EDIT_SUCCESS: 'edit_user_success',
  RESET_PASSWORD: 'reset_password',
  FORGOT_PASSWORD: 'forgot_password',
  FETCH_ERROR: 'fetch_user_error',
  EDIT_REQUEST: 'edit_user_request',
  EDIT_FAILURE: 'edit_user_failure',

  VERIFICATION_SUCCESS: 'verification_success',
  VERIFICATION_ERROR: 'verification_error',
  VERIFICATION_CLEAR: 'verification_clear',

  HANDLE_INPUT_CHANGE: 'handle_input_change',
}

export const MENU = {
  CHANGE_MENU: 'change_menu',
  INITIALIZE_MENU: 'initialize_menu',
  REMOVE_MENU: 'remove_menu',
}

export const ITEM = {
  FETCH_ALL_REQUEST: 'fetch_all_item_request',
  FETCH_ALL_SUCCESS: 'fetch_all_item_success',
  FETCH_ALL_FAILURE: 'fetch_all_item_failure',
  FETCH_SINGLE_REQUEST: 'fetch_single_item_request',
  FETCH_SINGLE_SUCCESS: 'fetch_single_item_success',
  FETCH_SINGLE_FAILURE: 'fetch_single_item_failure',
  FETCH_CATEGORY_REQUEST: 'fetch_category_item_request',
  FETCH_CATEGORY_SUCCESS: 'fetch_category_item_success',
  FETCH_CATEGORY_FAILURE: 'fetch_category_item_failure',
}

export const ORDER = {
  CREATE_REQUEST: 'create_order_request',
  CREATE_SUCCESS: 'create_order_success',
  CREATE_FAILURE: 'create_order_failure',
  CREATE_RESET: 'create_order_reset',

  FETCH_REQUEST: 'fetch_user_order_request',
  FETCH_SUCCESS: 'fetch_user_order_success',
  FETCH_FAILURE: 'fetch_user_order_failure',

  UPDATE_REQUEST: 'update_order_request',
  UPDATE_SUCCESS: 'update_order_success',
  UPDATE_FAILURE: 'updat_order_failure',
}

export const CART = {
  ADD_REQUEST: 'add_cart_request',
  ADD_SUCCESS: 'add_cart_success',
  ADD_FAILURE: 'add_cart_failure',

  FETCH_REQUEST: 'fetch_cart_request',
  FETCH_SUCCESS: 'fetch_cart_success',
  FETCH_FAILURE: 'fetch_cart_failure',

  REMOVE_REQUEST: 'remove_cart_request',
  REMOVE_SUCCESS: 'remove_cart_success',
  REMOVE_FAILURE: 'remove_cart_failure',

  CHANGE_QUANTITY: 'change_cart_quantity',

  RESET_STATUS: 'reset_cart_status',

  FLUSH: 'flush_cart',
}