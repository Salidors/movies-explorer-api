const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_SECRET } = require('../configs/env');

module.exports = (req, res, next) => {
  try {
    const { jwt: token } = req.cookies;

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
  }

  next();
};
