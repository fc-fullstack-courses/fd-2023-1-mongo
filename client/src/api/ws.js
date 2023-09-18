import { io } from "socket.io-client";
import CONSTANTS from "../constants";
import { addMessage } from "../redux/slices/messagesSlice";
import store from "../redux";

const socket = io(CONSTANTS.WS_SERVER_URL);

// отправка данных нового сообщения на бек
export const sendMessage = (newMessageData) => {
  socket.emit('newMessage', newMessageData);
}

// записать новое сообщение
socket.on('newMessage', (newMessage) => {
  store.dispatch(addMessage(newMessage));
});