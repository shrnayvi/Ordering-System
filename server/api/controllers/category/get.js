const Category = require('@models/category');
const pagination = require('@utils/pagination');

/**
 * Fetch the categories with/without the hierarchy(upto 3 level deep)
 * @param {Object} req.query - Query parameter
 * @param {String} [req.query.get] - Query paramter for hierarchy('/category?get = hierarchical')
 * @param {string|number} [req.query.page] - Page Number
 * @param {string|number} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res) => {
  try {
    let total;
    const { skip, limit, sort, query } = pagination.getPagingArgs(req.query);
    let categories;
    if (req.query.get === 'hierarchical') {
      let query = [
        { $match: { parent: { $exists: false } } },
        { $sort: { createdAt: -1 } },
        {
          $graphLookup: {
            from: 'categories',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parent',
            as: 'children',
            maxDepth: 0,
          }
        },
        { $skip: skip },
        { $limit: limit },

      ]
      categories = await Category.aggregate(query);
      total = await Category.countDocuments({ parent: { $exists: false } })
      for (let i = 0, parentLength = categories.length; i < parentLength; i++) {
        if (categories[i].children.length) {
          for (let j = 0, childLength = categories[i].children.length; j < childLength; j++) {
            categories[i].children[j].children = [];
            let cat = await Category.find({ parent: categories[i].children[j]._id });
            categories[i].children[j].children.push(...cat);
          }
        }
      }
    } else {
      total = await Category.countDocuments({});
      categories = await Category.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    }

    const paging = pagination.getPagingResult(req.query, { total });

    return apiResponse.success(res, { message: 'fetched_category', data: { paging, categories } });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};


exports.getBySlug = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug });
    return apiResponse.success(res, { message: 'fetched_category', data: category });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};