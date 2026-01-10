const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room);
  });

  socket.on('send-message', (data) => {
    socket.to(data.room).emit('receive-message', data.message);
  });
});

server.listen(3000, () => {
  console.log('Server running');
});
