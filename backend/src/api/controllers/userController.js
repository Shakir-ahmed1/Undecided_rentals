const User = require('../models/userModel');
const { createToken } = require('../middelware/jwt');
const { registerErrorHandler } = require('../middelware/userErrorHandler');

const register = async (req, res) => {
  const {
    firstName, lastName, email, phoneNumber, password, confirmPassword,
  } = req.body;
  try {

    await User.validate({firstName, lastName, email, phoneNumber, password});
    if (password && (confirmPassword === '' || confirmPassword !== password)) {
      throw Error('confirm password has a problem');
    }
    const user = await User.create({firstName, lastName, email, phoneNumber, password});    
    res.status(201).json({ user });
  } catch (e) {
    const errors = registerErrorHandler(e, password, confirmPassword);
    res.status(400).json({ errors });
}
};
        

// USer login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

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
        secure: true,
      });
      return res.json('login Sucess');
    }
    return res.status(400).json({ error: 'Username and/or password incorrect' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const allUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
}

module.exports = { register, login, allUsers };
