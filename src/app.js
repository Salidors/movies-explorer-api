const express = require('express');

const { errors } = require('celebrate');
const rateLimit = require('./configs/rate-limit');
const helmet = require('./configs/helmet');

const cors = require('./middlewares/cors');
const cookieParser = require('./middlewares/cookies');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const router = require('./routes');
const serverError = require('./middlewares/server-error');

const app = express();
app.use('*', cors);
app.use(requestLogger);
app.use(rateLimit);
app.use(helmet);
// app.use(cors);
app.use(express.json());
app.use(cookieParser);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(serverError);

module.exports = app;
