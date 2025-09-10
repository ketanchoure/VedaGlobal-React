const mongoose = require("mongoose");


const quote_Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  company: { type: String },
  quantity: { type: String },
  message: { type: String },
}, {
  timestamps: true,
});

const Quote =   mongoose.model('Request', quote_Schema);


module.exports =Quote