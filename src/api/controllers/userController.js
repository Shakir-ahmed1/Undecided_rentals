const bcrypt = require('bcrypt');
const User = require('../models/userModel');
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

// USer login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

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
        secure: true,
      });
      return res.json('login Sucess');
    }
    return res.status(400).json({ error: 'Username and/or password incorrect' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { register, login };
