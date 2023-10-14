const cors = require('cors');

module.exports = cors({
  credentials: true,
  origin: [
    'https://api.arcana.nomoredomainsicu.ru',
    'https://arcana.nomoredomainsicu.ru',
    'http://localhost:3000',
    'http://localhost:3101',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
});
