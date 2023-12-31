require('dotenv').config();

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  PORT,
  DB_URL
} = process.env;

const CONSTANTS = {
  PORT: PORT || 5000,
  DB_URL: DB_URL || 'mongodb://localhost:27017/chatDB',
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'newMessage',
    NEW_MESSAGE_ERROR: 'newMessageError'
  }
}

module.exports = CONSTANTS;