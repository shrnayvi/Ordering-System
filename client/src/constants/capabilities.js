export default {
  '/items': ['customer'],
  '/items/:slug': ['customer'],

  '/customer': ['customer', 'admin'],
  '/customer/my-orders': ['customer'],
  '/customer/cart': ['customer'],
  '/customer/profile': ['customer'],

  '/admin': ['admin'],
  '/admin/profile': ['admin'],
  '/admin/users': ['admin'],
  '/admin/users/add': ['admin'],
  '/admin/users/edit/:_id': ['admin'],
  '/admin/categories/add': ['admin'],
  '/admin/categories': ['admin'],
  '/admin/categories/edit/:_id': ['admin'],
  '/admin/orders': ['admin'],
  '/admin/orders/detail/:orderId': ['admin'],
  '/admin/items': ['admin'],
  '/admin/items/add': ['admin'],
  '/admin/items/edit/:_id': ['admin'],
  '/admin/events': ['admin'],
}