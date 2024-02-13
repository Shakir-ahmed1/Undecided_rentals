const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
    maxlength: [80, 'First name must be under 80 characters'],
  },

  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
    maxlength: [80, 'Last name must be under 80 characters'],
  },

  email: {
    type: String,
    required: [true, 'Please enter you email'],
    unique: true,
    maxlength: [320, 'Email must be under 320 characters'],
    validate: [isEmail, 'Please enter a valid email']
  },

  phoneNumber: {
    type: String,
    required: [true, 'Please enter your phone number'],
    maxlength: [20, 'Phone number can not be more than 20 characters'],
    // validator: [isMobilePhone, 'Please enter a valid phone number'] // ### needs improvment
  },

  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Your password must be more than 8 characters']
  },

});

// hash the password before saving it to database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
module.exports = mongoose.model('User', userSchema);
