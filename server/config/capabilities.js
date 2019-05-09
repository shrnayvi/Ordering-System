module.exports = {
   /* User Resource */
   'delete_user': ['admin', 'customer'],
   'edit_user': ['admin', 'customer'],

   /* User Resource */
   'remove_attachment': ['admin'],
   
   /* Category Resource*/
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
};
