export const USER = {
   LOGIN: '/users/login', 
   REGISTER: '/users/register', 
   BY_ID: _id => `/users/${_id}`,
   EDIT: _id => `/users/${_id}`,
   RESET_PASSWORD: '/reset_password',
   FORGOT_PASSWORD: '/forgot_password', 
};