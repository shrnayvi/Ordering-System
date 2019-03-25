const User = require('@server/models/user');

module.exports = {
   model: User,

   get: (query, single) => {
      if (single) {
         return User.findOne(query);
      } else {
         return User.find(query);
      }
   },

   create: (data) => {
      let userDoc = new User(data);
      return userDoc.save();
   },

   update: (query, data) => {
      return User.findOneAndUpdate(query, data, { new: true });
   },

   delete: (query) => {
      return User.findOneAndRemove(query);
   },
}