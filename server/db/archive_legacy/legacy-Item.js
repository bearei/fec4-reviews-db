const mongoose = require('mongoose');
require('./index.js');

mongoose.Promise = global.Promise;

const itemSchema = new mongoose.Schema({
  itemId: { type: Number, required: true },
  companyName: { type: String, required: true },
  productName: { type: String, required: true },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
