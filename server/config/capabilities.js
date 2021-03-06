module.exports = {
   /* User Resource */
   'get_users': ['admin'],
   'get_user': ['admin', 'customer'],
   'edit_user': ['admin', 'customer'],
   'delete_user': ['admin', 'customer'],

   /* Attachment Resource */
   'remove_attachment': ['admin'],
   
   /* Category Resource*/
   'get_category': ['admin', 'customer'],
   'add_category': ['admin'],
   'edit_category': ['admin'],
   'remove_category': ['admin'],

   /* Item Resource*/
   'add_item': ['admin'],
   'edit_item': ['admin'],
   'remove_item': ['admin'],

   /* Favorite Resource*/
   'get_favorite': ['admin', 'customer'],
   'add_favorite': ['admin', 'customer'],
   'remove_favorite': ['admin', 'customer'],

   /* Order Resource*/
   'get_order': ['admin', 'customer'],
   'add_order': ['admin', 'customer'],
   'update_order': ['admin', 'customer'],
   
   /* Order detail Resource*/
   'get_order_detail': ['admin', 'customer'],

   /* Cart Resource*/
   'fetch_cart': ['customer'],
   'add_cart': ['customer'],
   'update_cart': ['customer'],
   'remove_cart': ['customer'],

   /* Event Resource*/
   'fetch_event': ['customer', 'admin'],
   'add_event': ['admin'],
   'edit_event': ['admin'],
   'remove_event': ['admin'],
};
