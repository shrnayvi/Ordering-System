const { update } = require('@server/services/category');
const validateCategoryInput = require('@validations/category/validate-input');

module.exports = async (req, res) => {
   const data = req.body;
   const { error } = validateCategoryInput(data);
   if(error) {
      return res.send({ status: 400, message: 'Bad Request', error });
   }

   try {
      let category = await update({ _id: req.params._id }, data);
      return res.send({ status: 200, message: 'Category Updated', data: category });
   } catch(e) {
      return res.send({ status: 500, message: 'Server Error', error: e.message });
   }
}