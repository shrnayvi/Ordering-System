const mongoose = require('mongoose');
const randomstring = require('randomstring');
const slugify = require('@utils/slugify');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
   name: String,
   description: String,
   slug: String,
   price: Number,
   avatar: {
      type: Schema.Types.ObjectId,
      ref: 'Attachment',
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
   },
}, { timestamps: true });


ItemSchema.pre('save', async function () {
   try {
      const slug = slugify(this.name);
      const item = await this.constructor.findOne({ slug });
      if(item) {
         const rand = randomstring.generate(5);
         this.slug = `${slug}-${rand}`
      } else {
         this.slug = slug;
      }
   } catch (e) {
      return Promise.reject(e);
   }
});


module.exports = mongoose.model('Item', ItemSchema);