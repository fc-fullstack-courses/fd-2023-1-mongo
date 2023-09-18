const http = require('http');
const app = require('./app.js');
const { PORT } = require('./constants.js');
const { Server } = require('socket.io');
const MessageService = require('./services/message.service.js');

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  // запускается во время подключения вебсоект клиента к серверу
  console.log('socket connected');
  console.log(socket);

  // логика создания сообщения в реалтайме
  socket.on('newMessage', async (newMessageData) => {

    console.log('new message recieved');
    console.log(newMessageData);

    // 1. Создать запись о новом сообщении в БД
    const newMessage = await MessageService.createMessage(newMessageData);

    // 2. сообщить всем клиентам о новом сообщении в реалтайме
    io.emit('newMessage', newMessage);
  });

  // событие отключения пользователя
  socket.on('disconnect', (reason) => {
    console.log(reason);
  })
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
