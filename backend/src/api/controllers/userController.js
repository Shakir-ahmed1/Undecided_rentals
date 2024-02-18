const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const { createToken } = require('../middelware/jwt');
const { registerErrorHandler, loginErrorHandler } = require('../middelware/userErrorHandler');

const register = async (req, res) => {
  const {
    firstName, lastName, email, phoneNumber, password, confirmPassword,
  } = req.body;
  try {
    await User.validate({
      firstName, lastName, email, phoneNumber, password,
    });
    if (password && (confirmPassword === '' || confirmPassword !== password)) {
      throw Error('confirm password has a problem');
    }
    const user = await User.create({
      firstName, lastName, email, phoneNumber, password,
    });

    const profile = await Profile.create({ user: user.id });

    res.status(201).json({ user, profile });
  } catch (e) {
    const errors = registerErrorHandler(e, password, confirmPassword);
    Object.keys(errors).forEach((key) => {
      if (errors[key] === '') {
        delete errors[key];
      }
    });
    res.status(400).json({ errors });
  }
};

// USer login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    loginErrorHandler(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Username and/or password incorrect' });
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
      return res.json({ user, accessToken });
    }
    return res.status(400).json({ error: 'Username and/or password incorrect' });
  } catch (errors) {
    return res.status(400).json({ errors });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, allUsers };
