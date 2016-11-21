'use strict';

class EventEmitter {
  constructor($rootScope, headerService, authService, userService) {
    $rootScope.$on('user:authorized', () => {
      headerService.onUserAuthorized();
    });

    $rootScope.$on('hide:menu', () => {
      headerService.closeMenu();
    });

    $rootScope.$on('user:perform:logout', () => {
      authService.logout();
    });

    $rootScope.$on('user:logout', () => {
      userService.resetActiveUser();
    });
  }
}

export default EventEmitter;
