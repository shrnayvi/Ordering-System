const { create } = require('@services/category');
const validateCategoryInput = require('@validations/category/validate-input');

module.exports = async (req, res) => {
   const data = req.body;

   const { error } = validateCategoryInput(data);
   if(error) {
      return apiResponse.badRequest(res, { data: error});
   } 
   try {
      const category = await create(data);
      return apiResponse.success(res, { message: 'added_category',data: category });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }

} 