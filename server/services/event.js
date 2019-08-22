const Event = require('@server/models/event');

module.exports = {
  count: query => {
    return Event.countDocuments(query);
  },

  get: (query, single = true) => {
    if (single) {
      return Event.findOne(query);
    }
    return Event.find(query);
  },

  create: (data) => {
    let event = new Event(data);
    return event.save();
  },

  update: (query, data) => {
    return Event.findOneAndUpdate(query, data, { new: true });
  },

  remove: (query) => {
    return Event.findOneAndRemove(query);
  },

}