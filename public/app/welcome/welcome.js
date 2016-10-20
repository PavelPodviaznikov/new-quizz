'use strict';

import './welcome.css';

import WelcomeCtrl from './welcomeCtrl';
import welcomeService from './welcomeService';

export default angular
  .module('quizzy.welcome', [])
  .controller(WelcomeCtrl.name, WelcomeCtrl)
  .factory(welcomeService.name, welcomeService);