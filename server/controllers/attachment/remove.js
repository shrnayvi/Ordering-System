const { remove } = require('@server/services/attachment');

module.exports = async (req, res) => {
   try {
      let attachment = await remove({ _id: req.params._id });
      if (!attachment) {
         return res.send({ status: 404, message: 'Attachment Not Found', data: [] });
      }
      return res.send({ status: 200, message: 'Attachment Deleted Successfully', data: attachment });
   } catch (e) {
      return res.send({ status: 500, message: e.message });
   }
}