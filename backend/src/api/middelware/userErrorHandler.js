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

module.exports = { registerErrorHandler };
