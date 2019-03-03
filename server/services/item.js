const mongoose = require('mongoose');
const itemSchema =  require('@server/pp/models/item');
const Item = mongoose.model('User', itemSchema);

module.exports = {
    model: Item,

    get: (query, single) => { 
        if(single) {
            return Item.findOne(query);
        } else {
            return Item.find(query);
        }
    },
    create: (data) => {
        let item = new Item(data);
        return item.save();
    },

    update: (query, data) => {
        return Item.findOneAndUpdate(query, data, { new: true });
    },

    delete: (query) => {
        return Item.findOneAndRemove(query);
    },
}