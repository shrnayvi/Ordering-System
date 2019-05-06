const { get } = require('@server/services/user');
module.exports = async (req, res) => {
   let users;
   try {
      if(req.params._id) {
         users = await get({ _id: req.params._id });
      } else {
         users = await get({}, false);
      }
      return res.send({ status: 200, message: 'Fetched Users', data: users });
   } catch(e) {
      return res.send({ status: 500, message: 'Server Error' });
   }
}