'use strict';

import './auth.css';

import AuthService from './authService';
import AuthCtrl from './authCtrl';
import authRoute from './authRoute';

import signUp from './signUp/signUpDirective';
import signIn from './signIn/signInDirective';

export default angular
  .module('quizzy.auth', [])
  .config(authRoute)
  .directive(signUp.name, signUp)
  .directive(signIn.name, signIn)
  .service('authService', AuthService)
  .controller(AuthCtrl.name, AuthCtrl);
