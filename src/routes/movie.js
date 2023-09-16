const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const router = require('express').Router();
const { linkRegex } = require('../utils');

const { postMovies, getMovies, deleteMovie } = require('../controllers/movie');

router.get('/users', getMovies);
router.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().string(),
      description: Joi.string().required(),
      image: Joi.string().pattern(linkRegex).required(),
      trailer: Joi.string().pattern(linkRegex).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().pattern(linkRegex).required(),
      movieId: Joi.number().required(),
    }),
  }),
  postMovies,
);

router.delete('/movie/:id', deleteMovie);

module.exports = router;
