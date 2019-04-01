const { remove } = require('@server/services/user');

module.exports = async (req, res) => {
   try {
      let users = await remove({ _id: req.params._id });
      if (!users) {
         return res.send({ status: 404, message: 'User Not Found', data: [] });
      }
      return res.send({ status: 200, message: 'User Deleted Successfully', data: users });
   } catch (e) {
      return res.send({ status: 500, message: e.message });
   }
}