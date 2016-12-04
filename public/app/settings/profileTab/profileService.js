'use strict';

let _userService = new WeakMap();

class ProfileTabService {
  constructor(userService) {
    _userService.set(this, userService);

    this._profile = Object.assign({}, userService.getActiveUser());
  }

  get profile() {
    return this._profile;
  }
}

export default ProfileTabService;