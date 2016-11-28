'use strict';

import util from '../../util';

class OnlineUsersService {
  constructor() {
    this._onlineUsers = {
      capitals: {length: 1},
      countries: {length: 1}
    };
  }

  get onlineUsers() {
    return this._onlineUsers;
  }

  onOnlineUserAdded({users, user}) {
    if(!user) return false;

    for(let category in users) {
      Object.assign(this._onlineUsers[category], users[category]);
    }

    updateOnlineUsersLength(this._onlineUsers);
  }

  onOnlineUserRemoved({user, category}) {
    if(!user) return false;

    delete this._onlineUsers[category][user.connectionId];
    updateOnlineUsersLength(this._onlineUsers);
  }

  onOnlineUserUpdated({user, category}) {
    if(!user) return false;

    Object.assign(this._onlineUsers[category][user.connectionId], user);
    updateOnlineUsersLength(this._onlineUsers);
  }
}

function updateOnlineUsersLength(onlineUsers) {
  for(let category in onlineUsers) {
    onlineUsers[category].length = Object.keys(onlineUsers[category]).length - 1 || 1;
  }
}

export default OnlineUsersService;
