'use strict';

let io = require('socket.io');
let categoryService = require('./category');
let OnlineUsers = require('./controllers/OnlineUsersController');

function socket(http) {
  io = io(http);

  io.on('connection', (socket) => {
    console.log(`Connection ${socket.id} started`);

    socket.on('disconnect', () => {
     console.log(`Connection ${socket.id} closed`);
     categoryService.clear.call(socket);
     OnlineUsers.removeOnlineUser(socket);
    });

    socket.on('room:joined', (data) => {
       categoryService.generateQuestion.call(socket, data.category);
       OnlineUsers.addOnlineUser(data.user, socket);
    });

    socket.on('room:leave', (category) => {
      OnlineUsers.removeOnlineUser(socket, category);
    });

    socket.on('user:authorized', user => {
      OnlineUsers.updateOnlineUser(user, socket);
    });

    socket.on('room:answer', categoryService.checkAnswer);
  });
}

module.exports = socket;
