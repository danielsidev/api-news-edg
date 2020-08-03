const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  date_logout: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('token_blacklist', tokenSchema);