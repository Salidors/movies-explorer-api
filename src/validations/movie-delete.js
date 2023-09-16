const { celebrate, Segments } = require('celebrate');
const { Joi } = require('celebrate');

const validation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = validation;
