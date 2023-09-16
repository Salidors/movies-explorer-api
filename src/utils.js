const linkRegex = /https?:\/\/.*\.?/;

const jwtSecret = process.env.JWT_SECRET || 'some-secret-key';

module.exports = { linkRegex, jwtSecret };
