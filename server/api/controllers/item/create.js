const Item = require('@models/item');
const validateInput = require('@validations/item/validate-input');

module.exports = async (req, res) => {
   const data = req.body,
      { error } = validateInput(data);

   if(error) {
      return apiResponse.badRequest(res, { data: error });
   }

   try {
      const doc = new Item(data);
      const item = await doc.save();
      return apiResponse.success(res, { message: 'added_item', data: item });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}