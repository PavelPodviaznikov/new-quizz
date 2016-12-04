'use strict';

import Firebase from '../../quizzy/services/firebaseService';
import spinner from '../../quizzy/directives/spinner/Spinner';

class SignUpService {
  constructor($http, userService, authService, toastService, socketService) {
    this._$http = $http;
    this._authService = authService;
    this._userService = userService;
    this._toastService = toastService;
    this._socketService = socketService;
  }

  signUp(form, user) {
    if(form.$invalid) return false;

    spinner.toggle();

    registerUser.call(this, user)
      .then(onUserRegisterSuccess.bind(this))
      .catch(onUserRegisterFail.bind(this));
  }

  signUpWithGoogle() {
    let me = this;

    spinner.toggle();

    Firebase.googleAuth()
      .then(googleUser => {

        let user = {
          email: googleUser.user.email,
          photoUrl: googleUser.user.providerData[0].photoURL,
          token: googleUser.credential.idToken
        };

        return registerUserWithGoogle.call(me, user);
      })
      .then(onUserRegisterSuccess.bind(me))
      .catch(onUserRegisterFail.bind(me));
  }
}

function registerUser(user) {
  return this._$http({
    method: "POST",
    url: '/user',
    data: {"user": user}
  });
}

function registerUserWithGoogle(user) {
  return this._$http({
    method: "POST",
    url: '/user-google',
    data: {"user": user}
  });
}

function onUserRegisterSuccess(response) {
  spinner.toggle();

  if(!response.data) return false;

  if(isUserExists(response.data.code)) {
    displayFailToast.call(this);

    return false;
  }

  this._authService.closeDialog();
  this._userService.setActiveUser(response.data);
  this._socketService.socket.emit('user:authorized', response.data);
}

function onUserRegisterFail(err) {
  spinner.toggle();

  if(isUserExists(err.data.code)) {
    displayFailToast.call(this);
  }
}

function isUserExists(msg) {
  return msg === "auth/email-already-in-use";
}

function displayFailToast() {
  this._toastService.fail({
    msg: "This email is in use.",
    parent: '.auth-dialog md-dialog-content'
  });
}

export default SignUpService;
