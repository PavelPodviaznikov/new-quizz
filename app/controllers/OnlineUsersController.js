'use strict';

let categoryService = require('../category');

let onlineUsers = {};

module.exports = {
  addOnlineUser(user, socket) {
    user.connectionId = socket.id;
    onlineUsers[socket.id] = user;

    socket.emit('onlineUsers:added', {user: onlineUsers[socket.id], users: onlineUsers});
    socket.broadcast.emit('onlineUsers:added', {user: onlineUsers[socket.id], users: onlineUsers});
  },
  removeOnlineUser(socket) {
    socket.emit('onlineUsers:removed', onlineUsers[socket.id]);
    socket.broadcast.emit('onlineUsers:removed', onlineUsers[socket.id]);

    delete onlineUsers[socket.id];

    if(!Object.keys(onlineUsers).length) categoryService.resetActiveQuestion();
  },
  updateOnlineUser(user, socket) {
    if(onlineUsers[socket.id]) {
      Object.assign(onlineUsers[socket.id], user);

      socket.emit('onlineUsers:updated', onlineUsers[socket.id]);
      socket.broadcast.emit('onlineUsers:updated', onlineUsers[socket.id]);
    }
  }
};
