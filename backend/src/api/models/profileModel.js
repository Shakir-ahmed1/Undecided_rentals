const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    contentType: String,
    default: '',
  },

  bio: {
    type: String,
    default: '',
    maxlength: [200, 'biomust be under 80 characters'],
  },

  country: {
    type: String,
    default: '',
    maxlength: [30, 'Country must be under 30 characters'],
  },
  state: {
    type: String,
    default: '',
    maxlength: [30, 'Last name must be under 30 characters'],
  },
  houseAddress: {
    type: String,
    default: '',
    maxlength: [40, 'Last name must be under 40 characters'],
  },
});

module.exports = mongoose.model('Profile', profileSchema);
