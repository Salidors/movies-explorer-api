const { celebrate, Segments } = require('celebrate');
const { Joi } = require('celebrate');

const validation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
  }),
});

module.exports = validation;
