'use strict';

class SignUpService {
  constructor($http) {
    this._$http = $http;
  }

  signUp(form, user) {
    if(form.$invalid) return false;
    console.log(user);
  }

  signUpWithGoogle() {
    console.log('google sign up');
  }
}

export default SignUpService;
