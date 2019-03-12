const mongoose = require('mongoose');
require('./index.js');

mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  recommend: { type: Boolean, required: true },
  name: { type: String, required: true },
  fit: { type: Number, default: 0 },
  itemId: { type: Number, required: true },
  helpful: { type: Number, default: 0 },
  notHelpful: { type: Number, default: 0 },
  flag: { type: Boolean, default: 0 },
}, {
  timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
