const {
  PORT = 3000,
  JWT_SECRET = 'some-secret-key',
  DB_CONNECTION = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  DB_CONNECTION,
};
