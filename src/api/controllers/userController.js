const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const cookie = require('cookie-parser');
const { createToken } = require('../middelware/jwt');

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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Username and/or password do not exist' });
    }

    const dbPassword = user.password;
    const match = await bcrypt.compare(password, dbPassword);

    if (match) {
      const accessToken = createToken(user);
      res.cookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
        secure: true
      });
      res.json('login Sucess');
    } else {
      res.status(400).json({ error: 'Username and/or password incorrect' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { register, login };
