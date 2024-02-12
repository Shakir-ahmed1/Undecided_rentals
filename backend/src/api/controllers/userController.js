const User = require('../models/userModel');
const { createToken } = require('../middelware/jwt');
const { response } = require('express');

function registerErrorHandler(e, password, confirmPassword) {
   const errors = {
    firstName : '', lastName : '', email : '', phoneNumber : '', password : '', confirmPassword : '',
  } 
  
  // duplicate email validation
  if (e.code === 11000) {
      errors.email = 'That email is already taken';
      return errors;
  }
 
  // input validation
  if (e.message.includes('Validation failed')) {
      Object.values(e.errors).forEach(({properties}) => {
          errors[properties.path] = properties.message;
      });
  }
  // if no input errors on the password check confirmation
  if (errors.password !== '') {
    // handling for empty confirm password
    if (confirmPassword === '') {
      errors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'This field must match your password'
    }
  }
  return errors;
}


const register = async (req, res) => {
  const {
    firstName, lastName, email, phoneNumber, password, confirmPassword,
  } = req.body;
  try {

    await User.validate({firstName, lastName, email, phoneNumber, password});
    if (password && (confirmPassword === '' || confirmPassword !== password)) {
      throw Error('confirm password has a problem');
    }
    const user = await User.validate({firstName, lastName, email, phoneNumber, password});    
    res.status(200).json({ user });
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
