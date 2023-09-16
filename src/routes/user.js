const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const router = require('express').Router();

const { patchUser, getUser } = require('../controllers/user');

router.get('/users/me', getUser);

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
    }),
  }),
  patchUser,
);

module.exports = router;
