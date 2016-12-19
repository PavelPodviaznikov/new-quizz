'use strict';

let io = require('socket.io');
const Question = require('./controllers/QuestionController');
const OnlineUsers = require('./controllers/OnlineUsersController');
const enums = require('./enums');

function socket(http) {
  io = io(http);

  io.on(enums.socketEvents.connection, (socket) => {
    console.log(`Connection ${socket.id} started`);

    socket.emit(enums.socketEvents.onlineUsers, OnlineUsers.getUsers());

    socket.on(enums.socketEvents.disconnect, () => {
     console.log(`Connection ${socket.id} closed`);

     OnlineUsers.removeOnlineUser(socket);
    });

    socket.on(enums.socketEvents.roomJoined, data => {
       Question.generateQuestion({category: data.category, socket, isAfterAnswer: false});
       OnlineUsers.addOnlineUser(data.user, data.category, socket);
    });

    socket.on(enums.socketEvents.roomLeave, (category) => {
      OnlineUsers.removeOnlineUser(socket, category);
    });

    socket.on(enums.socketEvents.userAuthorized, user => {
      OnlineUsers.updateOnlineUser(user, socket);
    });

    socket.on(enums.socketEvents.roomAnswer, config => {
      Question.updateUserStatistic(config, socket);
      Question.generateQuestion({category: config.category, socket, isAfterAnswer: true});
    });
  });
}

module.exports = socket;
