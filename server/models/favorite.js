const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
}, { timestamps: true });

FavoriteSchema.pre('save', async function(){
    try {
        const favorite = await this.constructor.findOne({ 
            user: this.user,
            item: this.item,
         });
         if(favorite) {
            return Promise.reject({ error: 'favorite_exists' });
         }
    } catch(e) {
        return Promise.reject(e);
    }
}); 

module.exports = mongoose.model('Favorite', FavoriteSchema);