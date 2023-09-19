const http = require('http');
const app = require('./app.js');
const { PORT, SOCKET_EVENTS } = require('./constants.js');
const { Server } = require('socket.io');
const MessageService = require('./services/message.service.js');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  // запускается во время подключения вебсоект клиента к серверу
  console.log('socket connected');

  // логика создания сообщения в реалтайме
  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (newMessageData) => {
    console.log('new message recieved');
    try {

      // 1. Создать запись о новом сообщении в БД
      const newMessage = await MessageService.createMessage(newMessageData);

      // 2. сообщить всем клиентам о новом сообщении в реалтайме
      io.emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);
    } catch (error) {
      // посылаем сообщение о ошибке отправителю некорректного сообщения
      socket.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error);
    }

  });

  // событие отключения пользователя
  socket.on('disconnect', (reason) => {
    console.log(reason);
  })
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
