'use strict';

import Firebase from '../quizzy/services/firebaseService';

class AuthService {
  constructor($state, $mdDialog, $rootScope, userService) {
    this._$mdDialog = $mdDialog;
    this._$state = $state;
    this._userService = userService;
    this._$rootScope = $rootScope;
  }

  openAuthDialog() {
    this._$mdDialog.show({
      controller: 'AuthCtrl',
      controllerAs: 'ac',
      bindToController: true,
      template: require('./auth.html'),
      parent: angular.element(document.body),
      clickOutsideToClose:true
    })
    .catch(() => {
      this._$state.go(this._$state.$current.parent.self.name);
    });
  }

  authWithGoogle() {
    Firebase.googleAuth()
      .then((result) => {
        this._userService.setActiveUser(result.user);
        this._$rootScope.$emit('user:authorized');
        this.closeDialog();
      })
      .catch(e => {
        console.error(e);
      });
  }

  closeDialog() {
    this._$mdDialog.cancel();
  }
}

export default AuthService;
