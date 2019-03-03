const mongoose = require('mongoose');
const favoriteSchema =  require('@server/models/favorite');
const Favorite = mongoose.model('User', favoriteSchema);

module.exports = {
    model: Favorite,

    get: (query, single) => { 
        if(single) {
            return Favorite.findOne(query);
        } else {
            return Favorite.find(query);
        }
    },
    create: (data) => {
        let favorite = new Favorite(data);
        return favorite.save();
    },

    update: (query, data) => {
        return Favorite.findOneAndUpdate(query, data, { new: true });
    },

    delete: (query) => {
        return Favorite.findOneAndRemove(query);
    },
}