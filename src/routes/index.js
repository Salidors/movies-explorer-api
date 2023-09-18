const router = require('express').Router();

const auth = require('../middlewares/auth');
const signupValidation = require('../validations/signup');
const signinValidation = require('../validations/signin');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { signin, signup } = require('../controllers/user');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', signinValidation, signin);
router.post('/signup', signupValidation, signup);

router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use('*', (_, __, next) => {
  next(new NotFoundError('Тут ничего нет'));
});

module.exports = router;
