const { get } = require('@server/services/attachment');

module.exports = async (req, res) => {
   let attachment;
   try {
      if(req.params._id) {
         users = await get({ _id: req.params._id }, true);
      } else {
         users = await get({}, false);
      }
      return res.send({ status: 200, message: 'Fetched Users', data: attachment });
   } catch(e) {
      return res.send({ status: 500, message: e.message });
   }
}