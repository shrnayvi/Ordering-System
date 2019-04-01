const { update } = require('@server/services/user');

module.exports = async (req, res) => {
   try {
      let users = await update({ _id: req.params._id }, req.body);
      if (!users) {
         return res.send({ status: 404, message: 'User Not Found', data: [] });
      }
      return res.send({ status: 200, message: 'User Updated Successfully', data: users });
   } catch (e) {
      return res.send({ status: 500, message: 'Server Error', error: e.message });
   }
}