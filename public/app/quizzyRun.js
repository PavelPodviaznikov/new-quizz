'use strict';

angular
  .module('quizzy')
  .run(quizzyRun);

quizzyRun.$inject = ['$rootScope'];

function quizzyRun($rootScope) {

  $rootScope.$on('$stateChangeStart', function() {

  });

  $rootScope.$on('$stateChangeError', function() {

  });
}