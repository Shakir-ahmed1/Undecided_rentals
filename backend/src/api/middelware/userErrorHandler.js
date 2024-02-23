const { isEmail } = require('validator');

function registerErrorHandler(e, password, confirmPassword) {
  const errors = {
    firstName: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '',
  };

  // duplicate email validation
  if (e.code === 11000) {
    errors.email = 'That email is already taken';
    return errors;
  }

  // input validation
  if (e.message.includes('Validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // if no input errors on the password check confirmation
  if (errors.password === '') {
  // handling for empty confirm password

    if (confirmPassword === '') {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'This field must match your password';
    }
  }
  return errors;
}

const loginErrorHandler = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = 'email required';
  }
  if (email && !isEmail(email)) {
    errors.email = 'please enter a valid email';
  }
  if (!password) {
    errors.password = 'please enter your password';
  }

  if (Object.keys(errors).length > 0) {
    throw errors; // Throw errors object
  }
};

module.exports = { registerErrorHandler, loginErrorHandler };
