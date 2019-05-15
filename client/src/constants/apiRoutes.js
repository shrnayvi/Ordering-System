export const USER = {
   LOGIN: '/users/login', 
   REGISTER: '/users/register', 
   BY_ID: _id => `/users/${_id}`,
   EDIT: _id => `/users/${_id}`,
   RESET_PASSWORD: '/users/reset-password',
   FORGOT_PASSWORD: '/users/forgot-password', 
};