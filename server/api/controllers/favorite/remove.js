const Favorite = require('@models/favorite');

module.exports = async (req, res) => {
   try {
      const _id = req.params._id;
      const removedFavorite = await Favorite.findOneAndRemove({ _id });
      return apiResponse.success(res, { message: 'removed_favorite', data: removedFavorite });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}