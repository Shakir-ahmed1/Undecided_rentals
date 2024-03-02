const { mongoose } = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please enter a review'],
    maxlength: [1024, 'a review can only be maximum of 1024 characters'],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
