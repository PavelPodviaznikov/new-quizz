'use strict';

let categoryService = require('../category');

let onlineUsers = {};

module.exports = {
  addOnlineUser(user, category, socket) {
    user.connectionId = socket.id;

    if(!onlineUsers[category]) onlineUsers[category] = {};
    onlineUsers[category][socket.id] = user;

    socket.emit('onlineUsers:added', {user: onlineUsers[category][socket.id], users: onlineUsers[category]});
    socket.broadcast.emit('onlineUsers:added', {user: onlineUsers[category][socket.id], users: onlineUsers[category]});
  },
  removeOnlineUser(socket, category) {
    if(!category) return false;

    socket.emit('onlineUsers:removed', onlineUsers[category][socket.id]);
    socket.broadcast.emit('onlineUsers:removed', onlineUsers[category][socket.id]);

    delete onlineUsers[category][socket.id];

    if(!Object.keys(onlineUsers).length) categoryService.resetActiveQuestion(category);
  },
  updateOnlineUser(user, socket) {
    for(let category in onlineUsers) {
      if(onlineUsers[category][socket.id]) {
        Object.assign(onlineUsers[socket.id], user);

        socket.emit('onlineUsers:updated', onlineUsers[category][socket.id]);
        socket.broadcast.emit('onlineUsers:updated', onlineUsers[category][socket.id]);
      }
    }
  }
};
