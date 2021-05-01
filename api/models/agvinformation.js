const mongoose = require('mongoose');
const collectionName = 'AGV_Info';

const agvinformationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  identifier: String,
  data: Object
});

module.exports = mongoose.model('Agvinformation', agvinformationSchema, collectionName);
