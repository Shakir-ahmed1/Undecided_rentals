const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
  const accessToken = sign(
    { userId: user.id, userName: user.email },
    'pizzaallthewayfam',
    { expiresIn: '1h' },
  );
  return accessToken;
};

const requireAuth = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    verify(accessToken, 'pizzaallthewayfam', (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized please login to continue' });
      } else {
        const { userId } = decodedToken;
        req.userId = userId;
        req.authenticated = true;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized. please logIn to continue' });
  }
};

module.exports = { createToken, requireAuth };
