const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surfboardSchema = new Schema({
  shaper: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    require: true,
  },
  size: {
    type: String,
  },
  image: {
    type: Object,
  },
  rating:{
    score: {
        type: Number,
        default: 0,
      },
    },
    //   username: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //   },
      
    
  

  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // comments: [commentSchema],
});

module.exports = mongoose.model('Surfboard', surfboardSchema);
