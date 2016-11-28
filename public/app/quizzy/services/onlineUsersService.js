'use strict';

import util from '../../util';

class OnlineUsersService {
  constructor() {
    this._onlineUsers = {};

    Object.defineProperty(this._onlineUsers, 'length', {
      value: 1,
      enumerable: false,
      writable: true
    });
  }

  get onlineUsers() {
    return this._onlineUsers;
  }

  onOnlineUserAdded({users, user}) {
    if(!user) return false;

    Object.assign(this._onlineUsers, users);
    updateOnlineUsersLength(this._onlineUsers);
  }

  onOnlineUserRemoved(user) {
    if(!user) return false;

    delete this._onlineUsers[user.connectionId];
    updateOnlineUsersLength(this._onlineUsers);
  }

  onOnlineUserUpdated(user) {
    if(!user) return false;

    Object.assign(this._onlineUsers[user.connectionId], user);
    updateOnlineUsersLength(this._onlineUsers);
  }
}

function updateOnlineUsersLength(onlineUsers) {
  onlineUsers.length = Object.keys(onlineUsers).length;
}

export default OnlineUsersService;
