'use strict';

import User from '../models/User';

class UserService {
  constructor() {
    this._activeUser = new User();
  }

  setActiveUser(user) {
    this._activeUser.fillWith(user);
  }

  getActiveUser() {
    return this._activeUser;
  }

  resetActiveUser() {
    this._activeUser.clear();
  }
}

export default UserService;
