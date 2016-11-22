'use strict';

import Firebase from '../quizzy/services/firebaseService';

class AuthService {
  constructor($state, $mdDialog, $rootScope, $http, userService) {
    this._$mdDialog = $mdDialog;
    this._$state = $state;
    this._userService = userService;
    this._$rootScope = $rootScope;
    this._$http = $http;
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

  logout() {
    Firebase.logout()
      .then(() => {
        this._$rootScope.$emit('user:logout');
      })
      .catch((err) => console.error(err));
  }

  authWithGoogle() {
    let googleUser;

    Firebase.googleAuth()
      .then(result => {
        googleUser = result;

        return signIn.call(this, googleUser);
      })
      .then(response => {
        console.log(response);
        this._userService.setActiveUser(googleUser.user, response.data);
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

function signIn(googleUser) {
  return this._$http({
    method: 'GET',
    url: '/user',
    params: {email: googleUser.user.email, token: googleUser.credential.idToken}
  });
}

export default AuthService;
