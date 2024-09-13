const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  key: String,
  title: String,
  active: Boolean,
  group: String
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
