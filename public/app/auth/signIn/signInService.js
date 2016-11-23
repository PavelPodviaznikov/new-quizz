'use strict';

import Firebase from '../../quizzy/services/firebaseService';
import spinner from '../../quizzy/directives/spinner/Spinner';

let _http = new WeakMap();
let _userService = new WeakMap();
let _authService = new WeakMap();
let _toastService = new WeakMap();

class SignInService {
  constructor($http, userService, authService, toastService) {
    _http.set(this, $http);
    _userService.set(this, userService);
    _authService.set(this, authService);
    _toastService.set(this, toastService);
  }

  signIn(user) {
    spinner.toggle();

    _http.get(this)({
      method: "GET",
      url: '/user',
      params: user
    })
    .then(onAuthorizationSuccess.bind(this))
    .catch(onAuthorizationFail.bind(this));
  }

  signInWithGoogle() {
    spinner.toggle();
    
    Firebase.googleAuth()
      .then(googleUser => {
        console.log(googleUser);

        let user = {
          email: googleUser.user.email,
          token: googleUser.credential.idToken
        };

        return signInWithGoogle.call(this, user);
      })
      .then(onAuthorizationSuccess.bind(this))
      .catch(onAuthorizationFail.bind(this));
  }
}

function signInWithGoogle(user) {
  return _http.get(this)({
    method: "GET",
    url: '/user-google',
    params: user
  });
}

function onAuthorizationFail(error) {
  spinner.toggle();

  _toastService.get(this).fail({
    msg: "Cannot authorize.",
    parent: '.auth-dialog md-dialog-content'
  });

  console.error(error);
}

function onAuthorizationSuccess(response) {
  spinner.toggle();

  _authService.get(this).closeDialog();
  _userService.get(this).setActiveUser(response.data);
}

export default SignInService;
