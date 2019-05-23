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
}