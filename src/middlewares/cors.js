const cors = require('cors');

module.exports = cors(
  cors({
    origin: [
      'https://api.arcana.nomoredomainsicu.ru',
      'https://arcana.nomoredomainsicu.ru',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
