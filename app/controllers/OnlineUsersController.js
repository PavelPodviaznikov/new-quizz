'use strict';

let onlineUsersService = require('../services/onlineUsersService');

module.exports = {
  addOnlineUser(userToAdd, category, socket) {
    let user = onlineUsersService.addOnlineUser({user: userToAdd, socketId: socket.id, category}),
        users = onlineUsersService.getOnlineUsers();

    socket.emit('onlineUsers:added', {user, users});
    socket.broadcast.emit('onlineUsers:added', {user, users});
  },
  removeOnlineUser(socket) {
    let {user, category} = onlineUsersService.removeOnlineUser(socket.id);

    socket.emit('onlineUsers:removed', {user, category});
    socket.broadcast.emit('onlineUsers:removed', {user, category});
  },
  updateOnlineUser(userToUpdate, socket) {
    let {user, category} = onlineUsersService.updateOnlineUser({user: userToUpdate, socketId: socket.id});

    socket.emit('onlineUsers:updated', {user, category});
    socket.broadcast.emit('onlineUsers:updated', {user, category});
  },

  getUsers: onlineUsersService.getOnlineUsers.bind(onlineUsersService)
};
