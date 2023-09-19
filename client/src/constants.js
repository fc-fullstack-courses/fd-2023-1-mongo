const SERVER_URL = 'localhost:5000';

const CONSTANTS = {
  HTTP_SERVER_URL: `http://${SERVER_URL}`,
  WS_SERVER_URL: `ws://${SERVER_URL}`,
  REFRESH_TOKEN: 'refreshToken',
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'newMessage',
    NEW_MESSAGE_ERROR: 'newMessageError'
  }
}

export default CONSTANTS;