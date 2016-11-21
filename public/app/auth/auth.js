'use strict';

import './auth.css';

import AuthService from './authService';
import AuthCtrl from './authCtrl';
import authRoute from './authRoute';

export default angular
  .module('quizzy.auth', [])
  .config(authRoute)
  .service('authService', AuthService)
  .controller(AuthCtrl.name, AuthCtrl);
