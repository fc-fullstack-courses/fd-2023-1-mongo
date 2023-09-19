const SERVER_URL = '2230-45-128-188-4.ngrok-free.app';

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