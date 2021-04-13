const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  year: {type: String, required: true},
  duration: {type: String, required: true},
  unit: {type: String, required: true},
  wished: {type: Boolean, required: true}
});

module.exports = mongoose.model('Visit', visitSchema);