const mongoose = require('mongoose');
const categorySchema =  require('@server/models/category');
const Category = mongoose.model('User', categorySchema);

module.exports = {
    model: Category,

    get: (query, single) => { 
        if(single) {
            return Category.findOne(query);
        } else {
            return Category.find(query);
        }
    },
    create: (data) => {
        let category = new Category(data);
        return category.save();
    },

    update: (query, data) => {
        return Category.findOneAndUpdate(query, data, { new: true });
    },

    delete: (query) => {
        return Category.findOneAndRemove(query);
    },
}