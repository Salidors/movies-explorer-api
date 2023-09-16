const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const router = require('express').Router();
const { linkRegex } = require('../utils');

const { postMovie, getMovies, deleteMovie } = require('../controllers/movie');

router.get('/movies', getMovies);
router.post(
  '/movies',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().pattern(linkRegex).required(),
      trailerLink: Joi.string().pattern(linkRegex).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().pattern(linkRegex).required(),
      movieId: Joi.number().required(),
    }),
  }),
  postMovie,
);

router.delete('/movies/:id', deleteMovie);

module.exports = router;
