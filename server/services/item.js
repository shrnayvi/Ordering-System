const Item = require("@server/models/item");

module.exports = {
  count: query => {
    return Item.countDocuments(query);
  },

  get: (query, single = true) => {
    if (single) {
      return Item.findOne(query);
    }

    return Item.find(query);
  },

  create: data => {
    let item = new Item(data);
    return item.save();
  },

  update: (query, data) => {
    return Item.findOneAndUpdate(query, data, { new: true });
  },

  remove: query => {
    return Item.findOneAndRemove(query);
  },

  /**
   * Aggregation query
   * @param {Object} [opts] - Aggregation Pipeline
   * @return {promise} - Returns aggregated result
   */
  aggregation: opts => {
    return Item.aggregate(opts);
  }
};
