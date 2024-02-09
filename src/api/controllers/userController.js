//Controllers to handel Users.
const User  = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = (req, res, next) => {
  const {firstName, lastName, email, phoneNumber,  password, confirmPassword } = req.body
  
  if (password === confirmPassword) {
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: hash
        }).then(() => {
            res.json("User Registration created Sucessfully")
        }).catch((err => {
            res.status(400).json({error: err});
        }));
    })
  } else {
    res.json('password do not match')
  }

};

module.exports = { register };