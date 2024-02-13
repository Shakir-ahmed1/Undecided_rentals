const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  bio: {
    type: String,
    default: '',
    maxlength: [200, 'Last name must be under 80 characters'],
  },

  country: {
    type: String,
    default: '',
    maxlength: [80, 'Last name must be under 80 characters'],
  },
  state: {
    type: String,
    default: '',
    maxlength: [80, 'Last name must be under 80 characters'],
  },
  houseAddress: {
    type: String,
    default: '',
    maxlength: [80, 'Last name must be under 80 characters'],
  },
});

module.exports = mongoose.model('Profile', profileSchema);
