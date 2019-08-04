export default {
  '/customer/dashboard': ['customer'],
  '/customer/my-orders': ['customer'],
  '/customer/cart': ['customer'],
  '/customer/profile': ['customer'],

  '/admin/profile': ['admin'],
  '/admin/dashboard': ['admin'],
  '/admin/users': ['admin'],
  '/admin/new-user': ['admin'],
  '/admin/edit-user/:_id': ['admin'],
  '/admin/new-category': ['admin'],
  '/admin/categories': ['admin'],
  '/admin/edit-category/:slug': ['admin'],
  '/admin/orders': ['admin'],
}