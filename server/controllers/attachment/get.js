const { get } = require('@server/services/attachment');

module.exports = async (req, res) => {
   let attachment;
   try {
      if(req.params._id) {
         attachment = await get({ _id: req.params._id }, true);
      } else if(req.params.name) {
         attachment = await get({ filename: req.params.name }, true);
      } else {
         attachment = await get({}, false);
      }
      return res.send({ status: 200, message: 'Fetched Attachment(s)', data: attachment });
   } catch(e) {
      return res.send({ status: 500, message: e.message });
   }
}