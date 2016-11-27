'use strict';

import Firebase from '../../quizzy/services/firebaseService';
import spinner from '../../quizzy/directives/spinner/Spinner';

let _http = new WeakMap();
let _userService = new WeakMap();
let _authService = new WeakMap();
let _toastService = new WeakMap();
let _socketService = new WeakMap();

class SignInService {
  constructor($http, userService, authService, toastService, socketService) {
    _http.set(this, $http);
    _userService.set(this, userService);
    _authService.set(this, authService);
    _toastService.set(this, toastService);
    _socketService.set(this, socketService);
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
      .then(this.authorizeGoogleUser.bind(this))
      .then(onAuthorizationSuccess.bind(this))
      .catch(onAuthorizationFail.bind(this));
  }

  authorizeGoogleUser(googleUser) {
    if(googleUser.credential.idToken) {
      localStorage.setItem('idToken', googleUser.credential.idToken);
    }

    let user = {
      email: googleUser.user.email || googleUser.email,
      token: googleUser.credential.idToken || localStorage.getItem('idToken')
    };

    return signInWithGoogle.call(this, user);
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
  _socketService.get(this).socket.emit('user:authorized', response.data);
}

export default SignInService;
