export default {
  HOME: '/',
  ITEM: '/items',
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROFILE: role =>  `/${role}/profile`,
  REGISTER: '/register',
  DASHBOARD: role => `/${role}/dashboard`,
  RESET_PASSWORD: '/reset-password',
  FORGOT_PASSWORD: '/forgot-password',
  MYORDERS: '/customer/my-orders',
  CART: '/customer/cart',
};