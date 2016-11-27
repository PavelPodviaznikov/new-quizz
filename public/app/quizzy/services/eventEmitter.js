'use strict';

import Firebase from './firebaseService';

class EventEmitter {
  constructor($rootScope, headerService, authService, userService, onlineUsersService, signInService) {
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
      Firebase.checkUserAuth(user => {
        if(user) {
          user = {user: user, credential: {}};
          signInService.authorizeGoogleUser(user)
            .then(response => userService.setActiveUser(response.data))
            .catch();
        }
      });
    });

    $rootScope.$on('onlineUsers:added', (e, data) => {
      onlineUsersService.onOnlineUserAdded(data);
    });

    $rootScope.$on('onlineUsers:removed', (e, onlineUser) => {
      onlineUsersService.onOnlineUserRemoved(onlineUser);
    });

    $rootScope.$on('onlineUsers:updated', (e, onlineUser) => {
      onlineUsersService.onOnlineUserUpdated(onlineUser);
    });
  }
}

export default EventEmitter;
