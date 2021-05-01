const mongoose = require('mongoose');
const collectionName = 'sales';

const salesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  identifier: String,
  data: Object
});

module.exports = mongoose.model('Sale', salesSchema, collectionName);
