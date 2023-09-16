const { constants } = require('http2');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const InternalServerError = require('../errors/internal-server-err');
const ForbiddenError = require('../errors/forbidden-err');

const Movie = require('../models/movie');

const getMovies = (req, res, next) =>
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(() => {
      const err = new InternalServerError('Не удалось загрузить фильмы');
      return next(err);
    });

const postMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ ...req.body, owner })
    .then((movie) =>
      res.status(constants.HTTP_STATUS_CREATED).send({ data: movie }),
    )
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Неверно заполнены поля'));
      } else {
        next(new InternalServerError('Не удалось добавить фильм'));
      }
    });
};

const deleteMovie = (req, res, next) =>
  Movie.findById(req.params.id)
    .orFail()
    .then(({ _doc }) => {
      if (!_doc.owner.equals(req.user._id)) {
        const error = new ForbiddenError('Не ваш фильм');
        return next(error);
      }
      return Movie.findByIdAndRemove(req.params.id);
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch((e) => {
      let err;
      if (e.name === 'DocumentNotFoundError') {
        err = new NotFoundError('Фильм не найден');
      } else {
        err = new InternalServerError('Не получилось удалить фильм');
      }
      return next(err);
    });

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
