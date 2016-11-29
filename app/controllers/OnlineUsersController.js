'use strict';

let categoryService = require('../category');

let onlineUsers = {};

module.exports = {
  addOnlineUser(user, category, socket) {
    user.connectionId = socket.id;

    if(!onlineUsers[category]) onlineUsers[category] = {};
    onlineUsers[category][socket.id] = user;

    socket.emit('onlineUsers:added', {user: onlineUsers[category][socket.id], users: onlineUsers});
    socket.broadcast.emit('onlineUsers:added', {user: onlineUsers[category][socket.id], users: onlineUsers});
  },
  removeOnlineUser(socket, category) {
    if(category) {
      socket.emit('onlineUsers:removed', {user: onlineUsers[category][socket.id], category});
      socket.broadcast.emit('onlineUsers:removed', {user: onlineUsers[category][socket.id], category});

      delete onlineUsers[category][socket.id];

      if(!Object.keys(onlineUsers).length) categoryService.resetActiveQuestion(category);
    } else {
      for(let categoryKey in onlineUsers) {
        if(onlineUsers[categoryKey][socket.id]) {
          socket.emit('onlineUsers:removed', {user: onlineUsers[categoryKey][socket.id], category: categoryKey});
          socket.broadcast.emit('onlineUsers:removed', {user: onlineUsers[categoryKey][socket.id], category: categoryKey});

          delete onlineUsers[categoryKey][socket.id];
        }
      }
    }
  },
  updateOnlineUser(user, socket) {
    for(let category in onlineUsers) {
      if(onlineUsers[category][socket.id]) {
        Object.assign(onlineUsers[socket.id], user);

        socket.emit('onlineUsers:updated', {user: onlineUsers[category][socket.id], category});
        socket.broadcast.emit('onlineUsers:updated', {user: onlineUsers[category][socket.id], category});
      }
    }
  }
};
