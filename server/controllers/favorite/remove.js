const { remove } = require('@services/favorite');

module.exports = async (req, res) => {
   try {
      const _id = req.params._id;
      const removedFavorite = await remove({ _id });
      return apiResponse.success(res, { message: 'removed_favorite', data: removedFavorite });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}