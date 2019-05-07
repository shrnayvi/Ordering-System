const Item = require('@server/models/item');

module.exports = {
   get: (query, single = true) => {
      if (single) {
         return Item.findOne(query);
      }

      return Item.find(query);
   },

   create: (data) => {
      let item = new Item(data);
      return item.save();
   },

   update: (query, data) => {
      return Item.findOneAndUpdate(query, data, { new: true });
   },

   remove: (query) => {
      return Item.findOneAndRemove(query);
   },
}