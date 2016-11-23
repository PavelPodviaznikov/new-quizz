'use strict';

import spinner from '../../quizzy/directives/spinner/Spinner';

class SignUpService {
  constructor($http, userService, authService, toastService) {
    this._$http = $http;
    this._authService = authService;
    this._userService = userService;
    this._toastService = toastService;
  }

  signUp(form, user) {
    if(form.$invalid) return false;

    spinner.toggle();

    this._$http({
      method: "POST",
      url: '/user',
      data: {"user": user}
    })
    .then(response => {
      spinner.toggle();
      if(!response.data) return false;

      if(response.data.code === "auth/email-already-in-use") {
        this._toastService.fail({
          msg: "This email is in use.",
          parent: '.auth-dialog md-dialog-content'
        });

        return false;
      }

      this._authService.closeDialog();
      this._userService.setActiveUser(response.data);
    })
    .catch(e => {
      spinner.toggle();
      console.error(e);
    });

  }

  signUpWithGoogle() {
    console.log('google sign up');
  }
}

export default SignUpService;
