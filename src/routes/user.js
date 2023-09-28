const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const router = require('express').Router();

const { patchUser, getUser, signout } = require('../controllers/user');

router.get('/users/me', getUser);

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  patchUser,
);

router.post('/signout', signout);

module.exports = router;
