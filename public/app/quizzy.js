'use strict';

/* Vendor modules */
import 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'jquery';
import 'socket.io-client';
import 'angular-material-icons';
import 'angular-messages';

/* Vendor styles */
import 'angular-material/angular-material.min.css';

/* App styles */
import './quizzy.scss';

/* App modules */
import QuizzyCtrl from './quizzyController';
import quizzyService from './quizzyService';
import quizzyRun from './quizzyRun';
import quizzyRouter from './quizzyRouter';

import dashboard from './dashboard/dashboard';
import category from './category/category';
import auth from './auth/auth';
import header from './header/header';
import socials from './quizzy/directives/socials/socials';
import spinner from './quizzy/directives/spinner/spinnerDirective';
import settings from './settings/settings';

import socketService from './quizzy/services/socketService';
import userService from './quizzy/services/userService';
import eventEmitter from './quizzy/services/eventEmitter';
import toastService from './quizzy/services/toastService';
import onlineUsersService from './quizzy/services/onlineUsersService';

angular
  .module('quizzy', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngMdIcons',

    dashboard.name,
    category.name,
    auth.name,
    header.name,
    socials.name,
    settings.name
  ])
  .run(quizzyRun)
  .config(quizzyRouter)
  .controller(QuizzyCtrl.name, QuizzyCtrl)
  .service('quizzyService', quizzyService)
  .service('userService', userService)
  .service('socketService', socketService)
  .service('eventEmitter', eventEmitter)
  .service('toastService', toastService)
  .service('onlineUsersService', onlineUsersService)
  .directive(spinner.name, spinner);
