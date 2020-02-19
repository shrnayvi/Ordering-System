const Item = require('@models/item');
const Category = require('@models/category');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res, next) => {
  try {
    const { skip, limit, sort, query } = pagination.getPagingArgs(req.query),
      total = await Item.countDocuments(query),
      items = await Item.find(query)
        .populate('category')
        .populate('avatar')
        .skip(skip)
        .limit(limit)
        .sort(sort);

      const paging = pagination.getPagingResult(req.query, { total });

    return apiResponse.success(res, { message: 'fetched_item', data: { paging, items } });
  } catch (e) {
    return next(e);;
  }
}


/**
 * Get the item by slug
 * @param {Object} [req.param] - Query Object
 * @param {String} [req.params._id] - Food Item slug
 */
exports.getById= async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params._id})
      .populate('category')
      .populate('avatar');

    return apiResponse.success(res, { message: 'fetched_item', data: item });
  } catch (e) {
    return next(e);;
  }
}

/**
 * Get items related to particular category and also the child categories if exists
 * @param {Object} req - Request Object
 * @param {String} req.params._id Category ID 
 */
exports.getMenuItems = async (req, res, next) => {
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
    return next(e);;
  }
}
