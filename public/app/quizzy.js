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
import './quizzy.css';

/* App modules */
import QuizzyCtrl from './quizzyController';
import quizzyService from './quizzyService';
import quizzyRun from './quizzyRun';
import quizzyRouter from './quizzyRouter';

import welcome from './welcome/welcome';
import category from './category/category';
import auth from './auth/auth';
import header from './quizzy/directives/header/header';
import socials from './quizzy/directives/socials/socials';
import spinner from './quizzy/directives/spinner/spinnerDirective';

import socketService from './quizzy/services/socketService';
import userService from './quizzy/services/userService';
import eventEmitter from './quizzy/services/eventEmitter';

angular
  .module('quizzy', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngMdIcons',

    welcome.name,
    category.name,
    auth.name,
    header.name,
    socials.name
  ])
  .run(quizzyRun)
  .config(quizzyRouter)
  .controller(QuizzyCtrl.name, QuizzyCtrl)
  .service('quizzyService', quizzyService)
  .service('userService', userService)
  .service('socketService', socketService)
  .service('eventEmitter', eventEmitter)
  .directive(spinner.name, spinner);
