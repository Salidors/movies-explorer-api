const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');
const InternalServerError = require('../errors/internal-server-err');
const ConflictError = require('../errors/conflict-err');
const { JWT_SECRET } = require('../configs/env');

const User = require('../models/user');

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      const error = new UnauthorizedError('Неверные почта или пароль');
      if (!user) {
        return next(error);
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return next(error);
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '1w',
      });

      return res.send({ token });
    })
    .catch((e) => {
      const err = new InternalServerError(e.message);
      return next(err);
    });
};

const getUser = (req, res, next) => User.findById(req.user._id)
  .then(({ email, name }) => res.send({ email, name }))
  .catch(() => {
    const err = new InternalServerError(
      'Не удалось загрузить данные пользователя',
    );
    return next(err);
  });

const signup = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then(({ _doc }) => res.send({
      name: _doc.name,
      email: _doc.email,
    }))
    .catch((e) => {
      let err;
      if (e.name === 'ValidationError') {
        err = new BadRequestError('Ошибка валидации');
      } else if (e.code === 11000) {
        err = new ConflictError('Почтовый адрес уже занят');
      } else {
        err = new InternalServerError('Не удалось создать пользователя');
      }
      return next(err);
    });
};

const patchUser = (req, res, next) => {
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true },
  )
    .orFail()
    .then(({ email, name }) => res.send({ email, name }))
    .catch((e) => {
      let err;
      if (e.name === 'DocumentNotFoundError') {
        err = new NotFoundError('Пользователь не найден');
      } else if (e.name === 'ValidationError') {
        err = new BadRequestError(e.message);
      } else if (e.name === 'CastError') {
        err = new BadRequestError('Неверный идентификатор пользователя');
      } else {
        err = new InternalServerError(
          'Не удалось обновить информацию о пользователе',
        );
      }
      return next(err);
    });
};

module.exports = {
  patchUser,
  signin,
  signup,
  getUser,
};
