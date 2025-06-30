const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Headset', 'Controller', 'Keyboard', 'Monitor', 'Chair'],
    required: true 
  },

  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // main image URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', productSchema);
