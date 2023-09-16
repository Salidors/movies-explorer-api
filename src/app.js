const express = require('express');

const rateLimit = require('./configs/rate-limit');
const helmet = require('./configs/helmet');
const { errors } = require('celebrate');

const cors = require('./middlewares/cors');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();
app.use(requestLogger);
app.use(rateLimit);
app.use(helmet);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());

module.exports = app;
