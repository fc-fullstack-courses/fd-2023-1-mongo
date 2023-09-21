const SERVER_URL = 'localhost:5001';

const CONSTANTS = {
  HTTP_SERVER_URL: `https://${SERVER_URL}`,
  WS_SERVER_URL: `wss://${SERVER_URL}`,
  REFRESH_TOKEN: 'refreshToken',
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'newMessage',
    NEW_MESSAGE_ERROR: 'newMessageError'
  }
}

export default CONSTANTS;