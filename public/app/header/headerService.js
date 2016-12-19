'use strict';

class HeaderService {
  constructor($rootScope, $interval, userService) {
    this._userService = userService;
    this._$rootScope = $rootScope;
    this._$interval = $interval;

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
    this._$interval(() => {
       this.conditions.isCheckingAuth = false; 
    }, 0);
  }

}

export default HeaderService;
