'use strict';

import Firebase from './firebaseService';

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

    $rootScope.$on('env:data:loaded', (e, env) => {
      Firebase.init(env);
    });
  }
}

export default EventEmitter;
