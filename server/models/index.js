const mongoose = require('mongoose');
const CONSTANTS = require('../constants');
const User = require('./user');
const Message = require('./message');
const RefreshToken = require('./refreshToken');

async function connectToDB() {
  await mongoose.connect(CONSTANTS.DB_URL);
}

connectToDB().catch(err => console.log(err));

module.exports = {
  User,
  Message,
  RefreshToken
}
