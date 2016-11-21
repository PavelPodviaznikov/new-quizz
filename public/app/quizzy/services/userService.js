'use strict';

class UserService {
  constructor() {
    this._activeUser = null;
  }

  setActiveUser(user) {
    this._activeUser = user;
  }

  getActiveUser() {
    return this._activeUser;
  }
}

export default UserService;
