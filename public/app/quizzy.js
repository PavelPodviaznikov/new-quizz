'use strict';

/* Vendor modules */
import 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

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

angular
  .module('quizzy', [
    'ui.router',
    'ngMaterial',

    welcome.name,
    category.name
  ])
  .run(quizzyRun)
  .config(quizzyRouter)
  .controller(QuizzyCtrl.name, QuizzyCtrl);
