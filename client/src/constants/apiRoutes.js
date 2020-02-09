const qs = require('querystring');
export const USER = {
  LOGIN: '/users/login',
  GOOGLE_OAUTH: '/oauth/google',
  REGISTER: '/users/register',
  FETCH_ALL: query => query ? `/users?${query}` : `/users`,
  BY_ID: _id => `/users/${_id}`,
  EDIT: _id => `/users/${_id}`,
  RESET_PASSWORD: '/users/reset-password',
  FORGOT_PASSWORD: '/users/forgot-password',
  DELETE: _id => `/users/${_id}`,
};

export const ITEM = {
  GET_ALL: query => query ? `/items?${query}` : '/items',
  ADD: '/items',
  GET_BY_SLUG: slug => `/items/${slug}`,
  GET_BY_CATEGORY: category => `/categories/${category}/items`,
  EDIT: _id => `/items/${_id}`,
  REMOVE: _id => `/items/${_id}`,
}

export const ORDER = {
  BULKCREATE: '/orders/bulk',
  ADD: '/orders',
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
  GET_ALL_CATEGORY: query => query ? `/categories?${query}` : '/categories',
  REMOVE: _id => `/categories/${_id}`,
  EDIT: _id => `/categories/${_id}`,
}

export const MEDIA = {
  ADD: '/attachment',
  GET_BY_ID: _id => `/attachment/${_id}`,
}

export const EVENT = {
  ADD: '/events',
  GET_BY_SLUG: slug =>  `/events/${slug}`,
  GET_ALL_EVENT: query => query ? `/events?${query}` : '/events',
  REMOVE: _id => `/events/${_id}`,
  EDIT: _id => `/events/${_id}`,
}