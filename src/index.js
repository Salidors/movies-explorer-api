const express = require('express');

const rateLimit = require('./configs/rate-limit');
const helmet = require('./configs/helmet');

const cors = require('./middlewares/cors');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { errors } = require('celebrate');
const mongoose = require('mongoose');
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

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
