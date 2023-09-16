const {
  PORT = 3000,
  JWT_SECRET = 'some-secret-key',
  DB_CONNECTION = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  DB_CONNECTION,
};
