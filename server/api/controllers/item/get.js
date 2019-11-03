const Item = require('@models/item');
const Category = require('@models/category');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res) => {
  try {
    const { skip, limit } = pagination(req.query),
      total = await Item.countDocuments({}),
      items = await Item.find({})
        .populate('category')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 'desc' });

    return apiResponse.success(res, { message: 'fetched_item', data: { total, pageCount: Math.ceil(total / dataPerPage), items } });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}


/**
 * Get the item by slug
 * @param {Object} [req.param] - Query Object
 * @param {String} [req.params.slug] - Food Item slug
 */
exports.getBySlug = async (req, res) => {
  try {
    const item = await Item.findOne({ slug: req.params.slug })
      .populate('category');
    return apiResponse.success(res, { message: 'fetched_item', data: item });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}

/**
 * Get items related to particular category and also the child categories if exists
 * @param {Object} req - Request Object
 * @param {String} req.params._id Category ID 
 */
exports.getMenuItems = async (req, res) => {
  try {

    const slug = req.params.slug;
    const { _id } = await Category.findOne({ slug });
    const items = await Item.find({ category: _id })
      .populate('category', 'name');

    let children = await Category.distinct('_id', { parent: _id });

    let childItems = await Item.find({ category: { $in: children } })
      .populate('category', 'name');

    return apiResponse.success(res, { message: 'fetched_category_item', data: [...items, ...childItems] });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}
