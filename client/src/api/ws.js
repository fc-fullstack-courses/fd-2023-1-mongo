import { io } from "socket.io-client";
import CONSTANTS from "../constants";
import { addMessage, addMessageError } from "../redux/slices/messagesSlice";
import store from "../redux";

const { WS_SERVER_URL, SOCKET_EVENTS } = CONSTANTS;

const socket = io(WS_SERVER_URL);

// отправка данных нового сообщения на бек
export const sendMessage = (newMessageData) => {
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, newMessageData);
}

// записать новое сообщение
socket.on(SOCKET_EVENTS.NEW_MESSAGE, (newMessage) => {
  store.dispatch(addMessage(newMessage));
});

// сохраняем ошибку некорректного сообщения
socket.on(SOCKET_EVENTS.NEW_MESSAGE_ERROR, (error) => {
  store.dispatch(addMessageError(error));
});
