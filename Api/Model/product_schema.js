const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  details: { type: Object, required: true }
  
});

exports.product = mongoose.model('Product', productSchema);
