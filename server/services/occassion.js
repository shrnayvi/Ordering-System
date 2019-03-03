const mongoose = require('mongoose');
const occassionSchema =  require('@server/models/occassion');
const Occassion = mongoose.model('User', occassionSchema);

module.exports = {
    model: Occassion,

    get: (query, single) => { 
        if(single) {
            return Occassion.findOne(query);
        } else {
            return Occassion.find(query);
        }
    },
    create: (data) => {
        let occassion = new Occassion(data);
        return occassion.save();
    },

    update: (query, data) => {
        return Occassion.findOneAndUpdate(query, data, { new: true });
    },

    delete: (query) => {
        return Occassion.findOneAndRemove(query);
    },
}