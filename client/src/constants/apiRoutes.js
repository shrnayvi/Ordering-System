const qs = require('querystring');
export const USER = {
  LOGIN: '/users/login',
  GOOGLE_OAUTH: '/oauth/google',
  REGISTER: '/users/register',
  FETCH_ALL: `/users`,
  BY_ID: _id => `/users/${_id}`,
  EDIT: _id => `/users/${_id}`,
  RESET_PASSWORD: '/users/reset-password',
  FORGOT_PASSWORD: '/users/forgot-password',
  DELETE: _id => `/users/${_id}`,
};

export const ITEM = {
  GET_ALL: '/items',
  ADD: '/items',
  GET_BY_SLUG: slug => `/items/${slug}`,
  GET_BY_CATEGORY: category => `/categories/${category}/items`,
  EDIT: _id => `/items/${_id}`,
  REMOVE: _id => `/items/${_id}`,
}

export const ORDER = {
  BULKCREATE: '/orders/bulk',
  GET_ORDER: userId => `/users/${userId}/orders`,
  GET_ALL_ORDER: '/orders',
  UPDATE_ORDER: _id => `/orders/${_id}`,
  ORDER_BY_STATUS: (status) => `/orders?status=${status}`,
  FILTER_ORDER: filterData => `/orders?${qs.encode(filterData)}`,
}

export const CART = {
  ADD: '/cart',
  GET: '/cart',
  REMOVE: _id => `/cart/${_id}`,
}

export const CATEGORY = {
  ADD: '/categories',
  GET_BY_SLUG: slug =>  `/categories/${slug}`,
  GET_ALL_CATEGORY: '/categories',
  REMOVE: _id => `/categories/${_id}`,
  EDIT: _id => `/categories/${_id}`,
}