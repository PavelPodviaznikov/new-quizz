'use strict';

const onlineUsersService = require('../services/onlineUsersService');
const enums = require('../enums');

module.exports = {
  addOnlineUser(userToAdd, category, socket) {
    let user = onlineUsersService.addOnlineUser({user: userToAdd, socketId: socket.id, category}),
        users = onlineUsersService.getOnlineUsers();

    socket.emit(enums.socketEvents.onlineUsersAdded, {user, users});
    socket.broadcast.emit(enums.socketEvents.onlineUsersAdded, {user, users});
  },
  removeOnlineUser(socket) {
    let {user, category} = onlineUsersService.removeOnlineUser(socket.id);

    socket.emit(enums.socketEvents.onlineUsersRemoved, {user, category});
    socket.broadcast.emit(enums.socketEvents.onlineUsersRemoved, {user, category});
  },
  updateOnlineUser(userToUpdate, socket) {
    let {user, category} = onlineUsersService.updateOnlineUser({user: userToUpdate, socketId: socket.id});

    socket.emit(enums.socketEvents.onlineUsersUpdated, {user, category});
    socket.broadcast.emit(enums.socketEvents.onlineUsersUpdated, {user, category});
  },

  getUsers: onlineUsersService.getOnlineUsers.bind(onlineUsersService)
};
