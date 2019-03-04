const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema({
   title: String,
   filename: String,
   createdAt: Number,
   updatedAt: Number,
});

module.exports = mongoose.model('Attachment', AttachmentSchema);