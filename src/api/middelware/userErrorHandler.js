const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.code === 11000 && err.keyPattern.email === 1) {
      res.status(400).json({ error: 'User with this email already exists' });
    } else if (err.name === 'ValidationError') {
      const errors = {};
      Object.keys(err.errors).forEach((field) => {
        errors[field] = err.errors[field].message;
      });
      res.status(400).json({ error: errors });
    } else {
      return res.status(400).json({ error: err.message || 'Internal server error' });
    }
  }
  return next(err); // Pass the error to the default Express error handler
};

module.exports = errorHandler;
