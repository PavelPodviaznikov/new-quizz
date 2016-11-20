'use strict';

/* Vendor modules */
import 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'jquery';
import 'socket.io-client';

/* Vendor styles */
import 'angular-material/angular-material.min.css';

/* App styles */
import './quizzy.css';

/* App modules */
import QuizzyCtrl from './quizzyController';
import quizzyRun from './quizzyRun';
import quizzyRouter from './quizzyRouter';
import welcome from './welcome/welcome';
import category from './category/category';

import socketService from './quizzy/services/socketService';

angular
  .module('quizzy', [
    'ui.router',
    'ngMaterial',

    welcome.name,
    category.name
  ])
  .run(quizzyRun)
  .config(quizzyRouter)
  .controller(QuizzyCtrl.name, QuizzyCtrl)
  .service('socketService', socketService);
