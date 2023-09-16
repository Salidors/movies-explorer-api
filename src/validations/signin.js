const { celebrate, Segments } = require('celebrate');
const { Joi } = require('celebrate');

const validation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = validation;
