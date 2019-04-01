const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema({
   title: String,
   filename: String,
}, { timestamps: true });

module.exports = mongoose.model('Attachment', AttachmentSchema);