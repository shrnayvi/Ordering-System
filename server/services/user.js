const User = require('@server/models/user');

module.exports = {
   model: User,

   get: (query, single = true) => {
      if (single) {
         return User.findOne(query);
      } 
      return User.find(query);
   },

   create: (data) => {
      let userDoc = new User(data);
      return userDoc.save();
   },

   update: (query, data) => {
      return User.findOneAndUpdate(query, data, { new: true });
   },

   remove: (query) => {
      return User.findOneAndRemove(query);
   },
}