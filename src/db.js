const mongoose = require('mongoose');
const { DB_CONNECTION } = require('./configs/env');

mongoose.connect(DB_CONNECTION);
