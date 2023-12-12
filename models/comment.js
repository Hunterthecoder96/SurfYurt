const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  surfboardId: {
    type: Schema.Types.ObjectId,
    ref: 'Surfboard',
    required: true,
  },
});
module.exports = mongoose.model('Comment', commentSchema);
