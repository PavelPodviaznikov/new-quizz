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

import quizzyHeader from './quizzy/directives/header/headerDirective';

import socketService from './quizzy/services/socketService';
import userService from './quizzy/services/userService';

angular
  .module('quizzy', [
    'ui.router',
    'ngMaterial',
    'ngMdIcons',

    welcome.name,
    category.name,
    auth.name
  ])
  .run(quizzyRun)
  .config(quizzyRouter)
  .controller(QuizzyCtrl.name, QuizzyCtrl)
  .service('quizzyService', quizzyService)
  .service('userService', userService)
  .service('socketService', socketService)
  .directive(quizzyHeader.name, quizzyHeader);
