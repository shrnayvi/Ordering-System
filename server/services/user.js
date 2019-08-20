const User = require('@server/models/user');
// User.deleteMany({}) .then(e =>console.log(e));
module.exports = {
   model: User,

   count: query => {
      return User.countDocuments(query);
   },

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