'use strict';

class HeaderService {
  constructor($rootScope, userService) {
    this._userService = userService;
    this._$rootScope = $rootScope;

    this.user = this._userService.getActiveUser();
    this.menu = {
      isOpened: false
    };

    this.conditions = {
      isCheckingAuth: true
    };
  }

  closeMenu() {
    if(this.menu.isOpened) this.menu.isOpened = false;
  }

  onUserAuthorized() {
    debugger;
    this.conditions.isCheckingAuth = false;
    console.log(this.user);
  }

}

export default HeaderService;
