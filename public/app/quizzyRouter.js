'use strict';

angular.module('quizzy')
  .config(quizzyRouter);

quizzyRouter.$inject = ['$urlRouterProvider', '$stateProvider'];

function quizzyRouter($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
    .state({
      name: 'welcome',
      url: '/welcome',
      views: {
        'content': {
          templateUrl: '/app/welcome/welcome.html',
          controller: 'WelcomeCtrl'
        }
      }
    });
}
