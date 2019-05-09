const Favorite =  require('@server/models/favorite');

module.exports = {
    get: (query, single = true) => { 
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