const mongoose = require('mongoose');
const randomstring = require('randomstring');
const slugify = require('@utils/slugify');

const { Schema, model } = mongoose;

const EventSchema = new Schema({
  name: String,
  description: String,
  slug: String,
  status: {
    type: Number,
    enum: [1, 2], //active: 1, closed: 2
    default: 1
  },
  priceLimit: Number,
}, { timestamps: true });

EventSchema.pre('save', async function () {
  try {
    const slug = slugify(this.name);
    const event = await this.constructor.findOne({ slug });
    if (event) {
      const rand = randomstring.generate(5);
      this.slug = `${slug}-${rand}`;
    } else {
      this.slug = slug;
    }
  } catch (e) {
    return Promise.reject(e);
  }
});


module.exports = model('Event', EventSchema);