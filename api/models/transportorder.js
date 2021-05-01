const mongoose = require('mongoose');
const collectionName = 'jobmanagement';

const transportorderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  identifier: String,
  data: Object
});

module.exports = mongoose.model('Transportorder', transportorderSchema, collectionName);
