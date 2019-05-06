const { remove } = require('@server/services/category');

module.exports = async (req, res) => {
   try {
      const category = await remove({ _id: req.params._id });
      return res.send({ status: 200, message: 'Category Deleted', data: category })
   } catch(e) {
      return res.send({ status: 500, message: 'Server Error', error: e.message })
   }
}