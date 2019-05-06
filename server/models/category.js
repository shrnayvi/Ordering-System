const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slugify = require('@utils/slugify');

const CategorySchema = new Schema({
   name: String,
   description: String,
   slug: String,
   parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
   },
}, { timestamps: true });


CategorySchema.pre('save', async function() {
   try {
      const slug = slugify(this.name);
      const category = await this.constructor.findOne({ slug });
      if(category) {
         const rand = crypto.randomBytes(3).toString('hex');
         this.slug = `${slug}-${rand}`;
      } else {
         this.slug = slug;
      }
   } catch(e) {
      return Promise.reject(e);
   }
});

module.exports = mongoose.model('Category', CategorySchema);