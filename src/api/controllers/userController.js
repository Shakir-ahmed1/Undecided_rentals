const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const register = (req, res, next) => {
  const {
    firstName, lastName, email, phoneNumber, password, confirmPassword,
  } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hash,
    }))
    .then(() => res.json('User Registration was Successful'))
    .catch(next); // Pass errors to the next middleware
};

module.exports = { register };
