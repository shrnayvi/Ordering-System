const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema({
  originalname: String,
  filename: String,
  mimetype: String,
  status: Number,
  size: Number,
}, { timestamps: true });

module.exports = mongoose.model('Attachment', AttachmentSchema);