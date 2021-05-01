const mongoose = require('mongoose');
const collectionName = 'jobmanagement';

const jobmanagementSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  identifier: String,
  data: Object
});

module.exports = mongoose.model('Jobmanagement', jobmanagementSchema, collectionName);
