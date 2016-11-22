'use strict';

import User from '../models/User';

class UserService {
  constructor() {
    this._activeUser = new User();
  }

  setActiveUser(user, score) {
    this._activeUser.fillWith(user);
    this._activeUser.setScore(score);

    console.log(this._activeUser);
  }

  getActiveUser() {
    return this._activeUser;
  }

  resetActiveUser() {
    this._activeUser.clear();
  }
}

export default UserService;
