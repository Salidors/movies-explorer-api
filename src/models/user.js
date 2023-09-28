const mongoose = require('mongoose');

const { isEmail } = require('validator').default;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Необходимо заполнить Email'],
    validator: isEmail('foo@bar.com'),
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Необходимо заполнить Password'],
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
