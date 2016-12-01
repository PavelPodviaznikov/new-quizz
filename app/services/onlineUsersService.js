'use strict';

let categoryService = require('../category');

class OnlineUsersService {
  constructor() {
    this._onlineUsers = {};
  }

  addOnlineUser({user, category, socketId}) {
    user.connectionId = socketId;

    if(!this._onlineUsers[category]) {
       this._onlineUsers[category] = {};
    }

    this._onlineUsers[category][socketId] = user;

    return user;
  }

  removeOnlineUser(socketId) {
    let result = {user: null, category: null};

    for(let category in this._onlineUsers) {
      result.user = this._onlineUsers[category][socketId];
      if(result.user) {
        result.category = category;

        delete this._onlineUsers[category][socketId];
        if(!Object.keys(this._onlineUsers[category]).length) categoryService.resetActiveQuestion(category);

        break;
      }
    }

    return result;
  }

  updateOnlineUser({user, socketId}) {
    let result = {user: null, category: null};

    for(let category in this._onlineUsers) {
      if(this._onlineUsers[category][socketId]) {
        Object.assign(this._onlineUsers[category][socketId], user);

        result.category = category;
        result.user = this._onlineUsers[category][socketId];

        break;
      }
    }

    return result;
  }

  getOnlineUsers() {
    return this._onlineUsers;
  }
}

module.exports = new OnlineUsersService();
