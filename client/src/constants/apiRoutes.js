export const USER = {
   LOGIN: '/users/login', 
   GOOGLE_OAUTH: '/oauth/google', 
   REGISTER: '/users/register', 
   BY_ID: _id => `/users/${_id}`,
   EDIT: _id => `/users/${_id}`,
   RESET_PASSWORD: '/users/reset-password',
   FORGOT_PASSWORD: '/users/forgot-password', 
};

export const ITEM = {
   GET_ALL: '/items',
   GET_BY_SLUG: slug => `/items/${slug}`,
   GET_BY_CATEGORY: category => `/categories/${category}/items`,
}

export const ORDER = {
   CREATE: '/orders',
   GET_ORDER: userId => `/users/${userId}/orders`,
   UPDATE_ORDER: _id => `/orders/${_id}`,
}

export const CART = {
   ADD: '/cart',
   GET: '/cart',
   REMOVE: _id => `/cart/${_id}`,
}