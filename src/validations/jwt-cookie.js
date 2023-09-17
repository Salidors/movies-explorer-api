const { celebrate, Segments } = require('celebrate');
const { Joi } = require('celebrate');

const validation = celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string().length(172).required(),
  }),
});

module.exports = validation;
