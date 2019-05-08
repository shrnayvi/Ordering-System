const mongoose = require('mongoose');
const randomstring = require('randomstring');
const slugify = require('@utils/slugify');

const Schema = mongoose.Schema;


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
         const rand = randomstring.generate(5);
         this.slug = `${slug}-${rand}`;
      } else {
         this.slug = slug;
      }
   } catch(e) {
      return Promise.reject(e);
   }
});

module.exports = mongoose.model('Category', CategorySchema);