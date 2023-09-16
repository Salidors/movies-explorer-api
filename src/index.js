const express = require('express');

const rateLimit = require('./configs/rate-limit');
const helmet = require('./configs/helmet');

const cors = require('./middlewares/cors');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const { celebrate, Segments, errors } = require('celebrate');
const Joi = require('joi');
const mongoose = require('mongoose');

const NotFoundError = require('./errors/not-found-err');

const app = express();
app.use(requestLogger);
app.use(rateLimit);
app.use(helmet);
app.use(cors);

const port = 3000;

const { signin, signup } = require('./controllers/user');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  signin,
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30).required(),
      password: Joi.string().required(),
    }),
  }),
  signup,
);

app.use(auth);

app.use(userRouter);
app.use(movieRouter);

app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Тут ничего нет'));
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'Что-то случилось...' });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
