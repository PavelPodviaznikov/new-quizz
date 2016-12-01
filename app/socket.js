'use strict';

let io = require('socket.io');
let Question = require('./controllers/QuestionController');
let OnlineUsers = require('./controllers/OnlineUsersController');

function socket(http) {
  io = io(http);

  io.on('connection', (socket) => {
    console.log(`Connection ${socket.id} started`);

    socket.emit('onlineUsers', OnlineUsers.getUsers());

    socket.on('disconnect', () => {
     console.log(`Connection ${socket.id} closed`);

     OnlineUsers.removeOnlineUser(socket);
    });

    socket.on('room:joined', data => {
       Question.generateQuestion({category: data.category, socket, isAfterAnswer: false});
       OnlineUsers.addOnlineUser(data.user, data.category, socket);
    });

    socket.on('room:leave', (category) => {
      OnlineUsers.removeOnlineUser(socket, category);
    });

    socket.on('user:authorized', user => {
      OnlineUsers.updateOnlineUser(user, socket);
    });

    socket.on('room:answer', config => {
      Question.updateUserStatistic(config, socket);
      Question.generateQuestion({category: config.category, socket, isAfterAnswer: true});
    });
  });
}

module.exports = socket;
