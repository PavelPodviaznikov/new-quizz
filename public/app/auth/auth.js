'use strict';

import './auth.css';

import AuthService from './authService';
import AuthCtrl from './authCtrl';
import authRoute from './authRoute';

import signUp from './signUp/signUpDirective';
import signIn from './signIn/signInDirective';

import signUpService from './signUp/signUpService';
import signInService from './signIn/signInService';

export default angular
  .module('quizzy.auth', [])
  .config(authRoute)
  .directive(signUp.name, signUp)
  .directive(signIn.name, signIn)
  .service('authService', AuthService)
  .service('signUpService', signUpService)
  .service('signInService', signInService)
  .controller(AuthCtrl.name, AuthCtrl);
