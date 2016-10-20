'use strict';

export default quizzyRun;

quizzyRun.$inject = ['$rootScope'];

function quizzyRun($rootScope) {

  $rootScope.$on('$stateChangeStart', function() {

  });

  $rootScope.$on('$stateChangeError', function() {

  });
}