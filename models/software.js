const mongoose = require('mongoose');

const SoftwareSchema = new mongoose.Schema({
  title: { type: String, required: true },
  iconUrl: { type: String, required: true },
  downloads: { type: Number, default: 0 },
  size: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Software', SoftwareSchema);
